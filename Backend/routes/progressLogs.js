import express from 'express';
import ProgressLog from '../models/progressLog.js';
import Project from '../models/project.js';

const router = express.Router();

// Create a new progress log and calculate score
router.post('/', async (req, res) => {
    try {
        const { task_name, progress_percentage, project } = req.body;

        // Check if all required fields are provided
        if (!task_name || !progress_percentage || !project) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create the progress log
        const progressLog = new ProgressLog({
            task_name,
            progress_percentage,
            project,
        });

        // Save the progress log and calculate score
        await progressLog.save();

        // Ensure the calculateScore method exists and call it
        if (typeof progressLog.calculateScore === 'function') {
            await progressLog.calculateScore();
        } else {
            console.warn('calculateScore method is not defined in the ProgressLog model');
        }

        // Optionally, update project status based on progress
        const projectData = await Project.findById(project);
        if (!projectData) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (progress_percentage === 100) {
            projectData.status = 'completed';
            await projectData.save();
        }

        res.status(201).json(progressLog);
    } catch (err) {
        console.error('Error saving progress log:', err); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Get progress logs for a specific project
router.get('/:projectId', async (req, res) => {
    try {
        const progressLogs = await ProgressLog.find({ project: req.params.projectId });
        if (progressLogs.length === 0) {
            return res.status(404).json({ message: 'No progress logs found for this project' });
        }
        res.json(progressLogs);
    } catch (err) {
        console.error('Error fetching progress logs:', err);
        res.status(400).json({ message: 'Failed to retrieve progress logs', error: err.message });
    }
});

export default router;
