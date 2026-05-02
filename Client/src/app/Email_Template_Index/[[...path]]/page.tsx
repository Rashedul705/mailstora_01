import fs from 'fs/promises';
import path from 'path';
import FileListClient from '../FileListClient';

// Use a dynamic server-side rendered page
export const dynamic = 'force-dynamic';

export default async function DirectoryIndex({ params }: { params: Promise<{ path?: string[] }> }) {
    const resolvedParams = await params;
    const slugs = resolvedParams.path || [];
    const relativePath = slugs.join('/');
    
    // Resolve absolute path in the public directory
    const publicDir = path.join(process.cwd(), 'public', 'Email_Template');
    const targetDir = path.join(publicDir, relativePath);

    // Security check: ensure targetDir is inside publicDir
    if (!targetDir.startsWith(publicDir)) {
        return <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>403 Forbidden</div>;
    }

    let isDirectory = false;
    try {
        const stats = await fs.stat(targetDir);
        isDirectory = stats.isDirectory();
    } catch (e) {
        return <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>404 Not Found</div>;
    }

    if (!isDirectory) {
        // If it's a file but somehow bypassed static serving, we shouldn't render a directory listing
        return <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>File exists.</div>;
    }

    const files = await fs.readdir(targetDir);
    const fileListRaw = await Promise.all(
        files.map(async (file) => {
            // Hide hidden files like .DS_Store
            if (file.startsWith('.')) return null;

            const filePath = path.join(targetDir, file);
            const stats = await fs.stat(filePath);
            return {
                name: file,
                isDirectory: stats.isDirectory(),
                size: stats.size,
                lastModified: stats.mtime,
            };
        })
    );

    const validFiles = fileListRaw.filter((f): f is NonNullable<typeof f> => f !== null);

    // Sort: directories first, then files alphabetically
    validFiles.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
    });

    // Format helpers
    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0';
        const k = 1024;
        const sizes = ['b', 'k', 'M', 'G', 'T'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + sizes[i];
    };

    const formatDate = (date: Date) => {
        // Format to YYYY-MM-DD HH:MM like the screenshot
        const pad = (n: number) => String(n).padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const fileListFormatted = validFiles.map(file => ({
        ...file,
        size: formatSize(file.size),
        lastModified: formatDate(file.lastModified)
    }));

    const currentUrlPath = '/Email_Template' + (relativePath ? '/' + relativePath : '');
    const parentUrlPath = slugs.length > 0 ? '/Email_Template/' + slugs.slice(0, -1).join('/') : null;

    return (
        <FileListClient 
            fileList={fileListFormatted} 
            parentUrlPath={parentUrlPath} 
            currentUrlPath={currentUrlPath} 
        />
    );
}
