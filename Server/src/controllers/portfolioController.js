const Portfolio = require('../models/Portfolio');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Portfolio.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolio projects' });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Portfolio.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project' });
    }
};

exports.createProject = async (req, res) => {
    try {
        const newProject = new Portfolio(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: 'Error creating project', error });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const updatedProject = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: 'Error updating project' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const deletedProject = await Portfolio.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project' });
    }
};
