import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Typography, Card, CardContent } from '@mui/material';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        deadline: '',
        assigned_to: '',
    });

    // Fetch all projects
    const getProjects = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8001/api/projects');
            setProjects(response.data);
        } catch (e) {
            console.error('Error fetching projects:', e);
        }
    }, []);

    // Create a new project
    const createProject = async () => {
        try {
            await axios.post('http://localhost:8001/api/projects', newProject);
            // Reset form after submission
            setNewProject({ title: '', description: '', deadline: '', assigned_to: '' });
            getProjects(); // Refresh the project list
        } catch (e) {
            console.error('Error creating project:', e);
        }
    };

    // Update the project status
    const updateProjectStatus = async projectId => {
        try {
            await axios.patch(`http://localhost:8001/api/projects/${projectId}`, { status: 'accepted' });
            getProjects(); // Refresh the project list
        } catch (e) {
            console.error('Error updating project status:', e);
        }
    };

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    return (
        <Container>
            <Typography variant='h4' gutterBottom>
                Create a New Project
            </Typography>
            <Grid container spacing={2} mb={4}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Project Title'
                        variant='outlined'
                        fullWidth
                        value={newProject.title}
                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Assigned User ID'
                        variant='outlined'
                        fullWidth
                        value={newProject.assigned_to}
                        onChange={e => setNewProject({ ...newProject, assigned_to: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Project Description'
                        variant='outlined'
                        fullWidth
                        multiline
                        rows={4}
                        value={newProject.description}
                        onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Deadline'
                        variant='outlined'
                        fullWidth
                        type='datetime-local'
                        value={newProject.deadline}
                        onChange={e => setNewProject({ ...newProject, deadline: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' color='primary' onClick={createProject} fullWidth>
                        Create Project
                    </Button>
                </Grid>
            </Grid>

            <Typography variant='h4' gutterBottom>
                Assigned Projects
            </Typography>
            {projects.length === 0 ? (
                <Typography>No projects available.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {projects.map(project => (
                        <Grid item xs={12} sm={6} md={4} key={project._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h6'>{project.title}</Typography>
                                    <Typography variant='body1'>Description: {project.description}</Typography>
                                    <Typography variant='body2'>Assigned to: {project.assigned_to}</Typography>
                                    <Typography variant='body2'>Deadline: {new Date(project.deadline).toLocaleString()}</Typography>
                                    <Typography variant='body2'>Status: {project.status}</Typography>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        fullWidth
                                        onClick={() => updateProjectStatus(project._id)}
                                        disabled={project.status === 'accepted'}>
                                        {project.status === 'accepted' ? 'Already Accepted' : 'Accept Project'}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default ProjectList;
