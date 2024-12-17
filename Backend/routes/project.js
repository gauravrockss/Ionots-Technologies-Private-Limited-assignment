import express from 'express';
import Project from '../models/project.js';

const router = express.Router();

// Create a new project
router.post('/', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update project status (e.g., accept, complete)
router.patch('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Accept a project (e.g., mark as accepted)
router.patch('/:id/accept', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body; // Assuming user ID is sent with the request

        // Find the project and mark it as accepted
        const project = await Project.findByIdAndUpdate(id, { is_accepted: true, assigned_to: userId, status: 'accepted' }, { new: true });

        if (!project) {
            return res.status(404).send('Project not found');
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).send('Error accepting project');
    }
});

export default router;
