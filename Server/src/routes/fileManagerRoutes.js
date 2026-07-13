const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const path = require('path');
const multer = require('multer');
const { uploadToImgBB } = require('../services/imgbb');
const EmailTemplateImage = require('../models/EmailTemplateImage');
// Configure multer for file uploads to memory, then we write it
const upload = multer({ storage: multer.memoryStorage() });

// Define base directory for the backend (e.g., Server/public/Email_Template)
const BASE_DIR = path.join(process.cwd(), 'public', 'Email_Template');

async function ensureBaseDir() {
    try {
        await fs.access(BASE_DIR);
    } catch {
        await fs.mkdir(BASE_DIR, { recursive: true });
    }
}

function getSafePath(userPath) {
    if (!userPath) return BASE_DIR;
    const safePath = path.normalize(userPath).replace(/^(\.\.(\/|\\|$))+/, '');
    return path.join(BASE_DIR, safePath);
}

// @route   GET /api/file-manager
router.get('/', async (req, res) => {
    try {
        await ensureBaseDir();
        const folderPath = req.query.path || '';
        const targetDir = getSafePath(folderPath);

        if (!targetDir.startsWith(BASE_DIR)) {
            return res.status(403).json({ error: 'Unauthorized' });
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

        const validFiles = fileList.filter(f => f !== null);

        // Fetch DB records for this folder path
        const dbImages = await EmailTemplateImage.find({ folderName: folderPath });
        
        // Merge DB records into validFiles, avoiding duplicates by name
        const existingNames = new Set(validFiles.map(f => f.name));
        
        dbImages.forEach(dbImg => {
            if (!existingNames.has(dbImg.fileName)) {
                validFiles.push({
                    name: dbImg.fileName,
                    isDirectory: false,
                    size: dbImg.size,
                    lastModified: dbImg.uploadedAt,
                    isImgBB: true
                });
                existingNames.add(dbImg.fileName);
            }
        });

        validFiles.sort((a, b) => {
            if (a.isDirectory && !b.isDirectory) return -1;
            if (!a.isDirectory && b.isDirectory) return 1;
            return (a.name || '').localeCompare(b.name || '');
        });

        res.json({ files: validFiles, path: folderPath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @route   POST /api/file-manager
router.post('/', upload.single('file'), async (req, res) => {
    try {
        await ensureBaseDir();
        const action = req.body.action;
        const folderPath = req.body.path || '';
        const targetDir = getSafePath(folderPath);

        if (!targetDir.startsWith(BASE_DIR)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        if (action === 'create_folder') {
            const folderName = req.body.name;
            if (!folderName) return res.status(400).json({ error: 'Name required' });
            
            const newDirPath = path.join(targetDir, folderName);
            await fs.mkdir(newDirPath, { recursive: true });
            return res.json({ success: true, message: 'Folder created' });
        }

        if (action === 'upload') {
            if (!req.file) return res.status(400).json({ error: 'File required' });
            
            // Upload to ImgBB
            const imageUrl = await uploadToImgBB(req.file.buffer, req.file.originalname);
            
            // Save to DB
            await EmailTemplateImage.create({
                folderName: folderPath,
                fileName: req.file.originalname,
                imgbbUrl: imageUrl,
                size: req.file.size,
                uploadedAt: new Date()
            });

            return res.json({ success: true, message: 'File uploaded to ImgBB' });
        }

        res.status(400).json({ error: 'Invalid action' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @route   DELETE /api/file-manager
router.delete('/', async (req, res) => {
    try {
        const filePath = req.query.path;
        if (!filePath) return res.status(400).json({ error: 'Path required' });

        const targetPath = getSafePath(filePath);
        if (!targetPath.startsWith(BASE_DIR) || targetPath === BASE_DIR) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Check if file is in DB
        const parts = filePath.split('/');
        const fileName = parts.pop();
        const folderName = parts.join('/');
        
        const dbRecord = await EmailTemplateImage.findOneAndDelete({ folderName, fileName });
        
        // Delete from disk if it wasn't just a DB record, or try deleting both if it exists
        try {
            const stats = await fs.stat(targetPath);
            if (stats.isDirectory()) {
                await fs.rm(targetPath, { recursive: true, force: true });
            } else {
                await fs.unlink(targetPath);
            }
        } catch (fsErr) {
            // Ignore error if we already deleted from DB (means it was ImgBB only)
            if (!dbRecord) {
                throw fsErr;
            }
        }

        res.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
