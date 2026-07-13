import fs from 'fs/promises';
import path from 'path';
import FileListClient from '../FileListClient';

// Use a dynamic server-side rendered page
export const dynamic = 'force-dynamic';

export default async function DirectoryIndex({ params }: { params: Promise<{ path?: string[] }> }) {
    const resolvedParams = await params;
    const slugs = resolvedParams.path || [];
    const relativePath = slugs.join('/');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    
    let validFiles: any[] = [];
    let isError = false;

    try {
        const res = await fetch(`${apiUrl}/api/file-manager?path=${encodeURIComponent(relativePath)}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            isError = true;
        } else {
            const data = await res.json();
            validFiles = data.files || [];
        }
    } catch (e) {
        isError = true;
    }

    if (isError) {
        // If it failed to fetch (e.g. not a directory, or backend error),
        // we assume it might be a file request and redirect to the backend's proxy route.
        // The backend proxy route handles ImgBB redirects or serves the legacy file.
        const { redirect } = await import('next/navigation');
        redirect(`${apiUrl}/Email_Template/${relativePath}`);
    }

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
        lastModified: formatDate(new Date(file.lastModified))
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
