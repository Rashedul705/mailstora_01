const Pricing = require('../models/Pricing');

exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Pricing.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching packages' });
    }
};

exports.createPackage = async (req, res) => {
    try {
        const newPackage = new Pricing(req.body);
        const savedPackage = await newPackage.save();
        res.status(201).json(savedPackage);
    } catch (error) {
        res.status(400).json({ message: 'Error creating package' });
    }
};

exports.updatePackage = async (req, res) => {
    try {
        const updatedPackage = await Pricing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });
        res.json(updatedPackage);
    } catch (error) {
        res.status(400).json({ message: 'Error updating package' });
    }
};

exports.deletePackage = async (req, res) => {
    try {
        const deletedPackage = await Pricing.findByIdAndDelete(req.params.id);
        if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });
        res.json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting package' });
    }
};
