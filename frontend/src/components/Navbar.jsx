import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => (
    <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6' style={{ flexGrow: 1 }}>
                Project Management
            </Typography>
            <Button color='inherit' href='/'>
                Dashboard
            </Button>
            <Button color='inherit' href='/create'>
                Create Project
            </Button>
        </Toolbar>
    </AppBar>
);

export default Navbar;
