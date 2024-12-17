import React, { useCallback, useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import axios from 'axios';

const CreateProject = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assigned_to: '',
        deadline: '',
    });
    const [users, setUsers] = useState([]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        axios.post('http://localhost:8001/api/projects', formData).then(() => {
            setFormData({ title: '', description: '', assigned_to: '', deadline: '' });
        });
    };

    const getUsers = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8001/api/users');
            setUsers(response.data);
        } catch (e) {
            console.error('Error fetching users:', e);
        }
    }, []);

    useEffect(() => {
        getUsers(); // Fetch users on load
    }, [getUsers]);

    return (
        <Container>
            <Typography variant='h4' gutterBottom mt={4}>
                Create New Project
            </Typography>
            <TextField label='Title' name='title' value={formData.title} fullWidth margin='normal' onChange={handleChange} />
            <TextField label='Description' name='description' value={formData.description} fullWidth margin='normal' onChange={handleChange} />
            <FormControl fullWidth margin='normal'>
                <InputLabel>Assign To</InputLabel>
                <Select name='assigned_to' value={formData.assigned_to} onChange={handleChange} label='Assign To'>
                    {users.map(user => (
                        <MenuItem key={user._id} value={user._id}>
                            {user.username}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label='Deadline'
                name='deadline'
                type='date'
                value={formData.deadline}
                fullWidth
                margin='normal'
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
            />
            <Button variant='contained' color='primary' onClick={handleSubmit}>
                Create
            </Button>
        </Container>
    );
};

export default CreateProject;
