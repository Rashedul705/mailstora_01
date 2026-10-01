const File = require('../models/File');

const storeFile = async (name, contentType, data) => {
    try {
        const newFile = new File({
            name,
            contentType,
            data // This is the Buffer
        });
        const savedFile = await newFile.save();
        return savedFile._id;
    } catch (error) {
        console.error('File Storage Error:', error.message);
        throw new Error('Failed to store file in MongoDB');
    }
};

const getFile = async (id) => {
    try {
        const file = await File.findById(id);
        if (!file) throw new Error('File not found');
        return file;
    } catch (error) {
        console.error('File Retrieval Error:', error.message);
        throw error;
    }
};

module.exports = { storeFile, getFile };
