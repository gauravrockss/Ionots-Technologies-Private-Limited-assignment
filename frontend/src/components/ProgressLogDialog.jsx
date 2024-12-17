import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const ProgressLogDialog = ({ open, onClose, onSave }) => {
    const [taskName, setTaskName] = useState('');
    const [progressPercentage, setProgressPercentage] = useState('');

    const handleSave = () => {
        // Validate progress percentage before saving
        if (taskName && progressPercentage !== '') {
            const progressValue = parseInt(progressPercentage);

            if (progressValue > 100) {
                alert('Progress percentage cannot be more than 100');
                return; // Prevent saving if value exceeds 100
            }

            const log = {
                task_name: taskName,
                progress_percentage: progressValue,
            };
            onSave(log);
            setTaskName(''); // Reset task name field
            setProgressPercentage(''); // Reset progress percentage field
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Progress Log</DialogTitle>
            <DialogContent>
                <TextField label='Task Name' fullWidth value={taskName} onChange={e => setTaskName(e.target.value)} margin='normal' />
                <TextField
                    label='Progress Percentage'
                    fullWidth
                    type='number'
                    value={progressPercentage}
                    onChange={e => setProgressPercentage(e.target.value)}
                    margin='normal'
                    inputProps={{
                        max: 100, // Set maximum value for input field
                        min: 0, // Set minimum value for input field
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color='primary'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProgressLogDialog;
