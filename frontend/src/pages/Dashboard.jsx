import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProjectCard from '../components/ProjectCard';
import ProgressLogDialog from '../components/ProgressLogDialog';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8001/api/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleAddLog = projectId => {
        setSelectedProject(projectId); // Set the project to add the log for
    };

    const handleSaveLog = async log => {
        try {
            // Send the progress log data to the backend for saving
            await axios.post('http://localhost:8001/api/progress', {
                task_name: log.task_name,
                progress_percentage: log.progress_percentage,
                project: selectedProject,
            });
            setSelectedProject(null); // Reset selected project after saving the log
        } catch (err) {
            console.error('Error saving progress log:', err);
        }
    };

    const handleViewDetails = id => {
        // Navigate to the project details page
        navigate(`/project-details/${id}`);
    };

    const handleAcceptProject = async (projectId, id) => {
        try {
            const userId = id; // Replace with actual user ID from authentication
            await axios.patch(`http://localhost:8001/api/projects/${projectId}/accept`, { userId });
            // Fetch updated projects to refresh the UI
            fetchProjects();
        } catch (err) {
            console.error('Error accepting project:', err);
        }
    };

    return (
        <Container maxWidth='false' sx={{ my: 5 }}>
            <Typography variant='h4' gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {projects.map(project => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <ProjectCard
                            project={project}
                            onViewDetails={handleViewDetails} // Pass the updated handler
                            onAddLog={handleAddLog}
                            onAcceptProject={handleAcceptProject}
                        />
                    </Grid>
                ))}
            </Grid>
            <ProgressLogDialog open={!!selectedProject} onClose={() => setSelectedProject(null)} onSave={handleSaveLog} />
        </Container>
    );
};

export default Dashboard;
