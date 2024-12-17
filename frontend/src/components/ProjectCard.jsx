import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const ProjectCard = ({ project, onViewDetails, onAddLog, onAcceptProject }) => (
    <Card>
        <CardContent>
            <Typography variant='h5'>{project.title}</Typography>
            <Typography variant='body2' color='textSecondary'>
                {project.description}
            </Typography>
            <Typography variant='body2'>Assigned to: {project.assigned_to || 'Unassigned'}</Typography>
            <Typography variant='body2'>Deadline: {project.deadline}</Typography>
            <Typography variant='body2'>Status: {project.status}</Typography>
        </CardContent>
        <CardActions>
            <Button size='small' onClick={() => onViewDetails(project._id)}>
                View Details
            </Button>
            <Button size='small' onClick={() => onAddLog(project._id)}>
                Add Progress Log
            </Button>
            {!project.is_accepted && (
                <Button size='small' onClick={() => onAcceptProject(project._id, project.assigned_to)}>
                    Accept Project
                </Button>
            )}
        </CardActions>
    </Card>
);

export default ProjectCard;
