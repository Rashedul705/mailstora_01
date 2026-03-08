const Content = require('../models/Content');

exports.getAllContent = async (req, res) => {
    try {
        const contents = await Content.find();
        res.json(contents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content' });
    }
};

exports.getContentById = async (req, res) => {
    try {
        const content = await Content.findOne({ sectionId: req.params.sectionId });
        if (!content) return res.status(404).json({ message: 'Content not found' });
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content' });
    }
};

exports.updateContent = async (req, res) => {
    try {
        const updatedContent = await Content.findOneAndUpdate(
            { sectionId: req.params.sectionId },
            req.body,
            { new: true, upsert: true } // Upsert creates it if it doesn't exist
        );
        res.json(updatedContent);
    } catch (error) {
        res.status(400).json({ message: 'Error updating content' });
    }
};
