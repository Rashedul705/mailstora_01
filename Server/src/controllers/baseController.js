exports.getAll = (Model) => async (req, res) => {
    try {
        const docs = await Model.find().sort({ createdAt: -1 });
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOne = (Model) => async (req, res) => {
    try {
        const doc = await Model.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = (Model) => async (req, res) => {
    try {
        const doc = await Model.create(req.body);
        res.status(201).json(doc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = (Model) => async (req, res) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doc) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(doc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.remove = (Model) => async (req, res) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
