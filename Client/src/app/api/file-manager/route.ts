import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'public', 'Email_Template');

// Ensure base dir exists
async function ensureBaseDir() {
    try {
        await fs.access(BASE_DIR);
    } catch {
        await fs.mkdir(BASE_DIR, { recursive: true });
    }
}

function getSafePath(userPath: string | null) {
    if (!userPath) return BASE_DIR;
    // Prevent directory traversal
    const safePath = path.normalize(userPath).replace(/^(\.\.(\/|\\|$))+/, '');
    return path.join(BASE_DIR, safePath);
}

export async function GET(request: Request) {
    try {
        await ensureBaseDir();
        const { searchParams } = new URL(request.url);
        const folderPath = searchParams.get('path') || '';
        
        const targetDir = getSafePath(folderPath);
        
        if (!targetDir.startsWith(BASE_DIR)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const files = await fs.readdir(targetDir);
        const fileList = await Promise.all(
            files.map(async (file) => {
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

        const validFiles = fileList.filter((f) => f !== null);
        validFiles.sort((a, b) => {
            if (a?.isDirectory && !b?.isDirectory) return -1;
            if (!a?.isDirectory && b?.isDirectory) return 1;
            return (a?.name || '').localeCompare(b?.name || '');
        });

        return NextResponse.json({ files: validFiles, path: folderPath });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await ensureBaseDir();
        const formData = await request.formData();
        const action = formData.get('action');
        const folderPath = (formData.get('path') as string) || '';
        
        const targetDir = getSafePath(folderPath);

        if (!targetDir.startsWith(BASE_DIR)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        if (action === 'create_folder') {
            const folderName = formData.get('name') as string;
            if (!folderName) return NextResponse.json({ error: 'Name required' }, { status: 400 });
            
            const newDirPath = path.join(targetDir, folderName);
            await fs.mkdir(newDirPath, { recursive: true });
            return NextResponse.json({ success: true, message: 'Folder created' });
        }

        if (action === 'upload') {
            const file = formData.get('file') as File;
            if (!file) return NextResponse.json({ error: 'File required' }, { status: 400 });
            
            const buffer = Buffer.from(await file.arrayBuffer());
            const filePath = path.join(targetDir, file.name);
            await fs.writeFile(filePath, buffer);
            return NextResponse.json({ success: true, message: 'File uploaded' });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const filePath = searchParams.get('path');
        if (!filePath) return NextResponse.json({ error: 'Path required' }, { status: 400 });

        const targetPath = getSafePath(filePath);
        if (!targetPath.startsWith(BASE_DIR) || targetPath === BASE_DIR) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const stats = await fs.stat(targetPath);
        if (stats.isDirectory()) {
            await fs.rm(targetPath, { recursive: true, force: true });
        } else {
            await fs.unlink(targetPath);
        }

        return NextResponse.json({ success: true, message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
