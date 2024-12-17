import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Box, LinearProgress, Button } from '@mui/material';
import ProgressLogDialog from '../components/ProgressLogDialog';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [progressLogs, setProgressLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalProgress, setTotalProgress] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8001/api/projects/${id}`)
            .then(response => {
                setProject(response.data);
            })
            .catch(err => console.error(err));

        axios
            .get(`http://localhost:8001/api/progress/${id}`)
            .then(response => {
                setProgressLogs(response.data);
                calculateProgress(response.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    // Function to calculate the total progress from progress logs
    const calculateProgress = logs => {
        const total = logs.reduce((sum, log) => sum + log.progress_percentage, 0);
        const average = total / logs.length;
        setTotalProgress(average); // Set the average progress percentage
    };

    // Handle opening the dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Handle closing the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Handle saving the progress log
    const handleSaveLog = log => {
        axios
            .post('http://localhost:8001/api/progress', { ...log, project: id })
            .then(response => {
                setProgressLogs([...progressLogs, response.data]);
                calculateProgress([...progressLogs, response.data]); // Recalculate progress after adding new log
            })
            .catch(err => console.error(err));
        handleCloseDialog(); // Close the dialog after saving
    };

    return (
        <Container maxWidth='md' sx={{ my: 4 }}>
            {loading ? (
                <Grid container justifyContent='center' style={{ marginTop: '20px' }}>
                    <CircularProgress size={60} />
                </Grid>
            ) : (
                <>
                    {project && (
                        <>
                            <Typography variant='h3' gutterBottom align='center' color='primary' sx={{ marginBottom: 4 }}>
                                {project.title}
                            </Typography>
                            <Typography variant='h6' paragraph align='center' color='textSecondary' sx={{ marginBottom: 3 }}>
                                {project.description}
                            </Typography>

                            <Box sx={{ marginBottom: 5 }}>
                                <Typography variant='h5' gutterBottom color='primary'>
                                    Project Progress
                                </Typography>
                                <LinearProgress
                                    variant='determinate'
                                    value={totalProgress}
                                    sx={{
                                        height: 8,
                                        borderRadius: 5,
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                                <Typography variant='body2' align='center' sx={{ marginTop: 1 }}>
                                    {totalProgress.toFixed(2)}% completed
                                </Typography>
                            </Box>

                            <Grid container spacing={4} justifyContent='center'>
                                <Grid item xs={12} sm={8}>
                                    <Card variant='outlined' sx={{ minWidth: 275, padding: 3 }}>
                                        <CardContent>
                                            <Typography variant='h5' component='div' color='primary' gutterBottom>
                                                Progress Logs
                                            </Typography>
                                            <Grid container spacing={2}>
                                                {progressLogs.length > 0 ? (
                                                    progressLogs.map(log => (
                                                        <Grid item xs={12} key={log._id}>
                                                            <Card variant='outlined' sx={{ padding: 2 }}>
                                                                <Typography variant='h6'>{log.task_name}</Typography>
                                                                <Typography variant='body2' color='textSecondary'>
                                                                    Progress: {log.progress_percentage}%
                                                                </Typography>
                                                                <Box sx={{ marginTop: 2 }}>
                                                                    <LinearProgress
                                                                        variant='determinate'
                                                                        value={log.progress_percentage}
                                                                        sx={{ height: 6, borderRadius: 4 }}
                                                                    />
                                                                </Box>
                                                            </Card>
                                                        </Grid>
                                                    ))
                                                ) : (
                                                    <Typography variant='body2' color='textSecondary' mt={2} textAlign={'center'}>
                                                        No progress logs available.
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* Add Progress Log Button */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                                <Button variant='contained' color='primary' onClick={handleOpenDialog} sx={{ padding: '10px 20px' }}>
                                    Add Progress Log
                                </Button>
                            </Box>

                            {/* ProgressLogDialog Component */}
                            <ProgressLogDialog open={openDialog} onClose={handleCloseDialog} onSave={handleSaveLog} />
                        </>
                    )}
                </>
            )}
        </Container>
    );
};

export default ProjectDetails;
