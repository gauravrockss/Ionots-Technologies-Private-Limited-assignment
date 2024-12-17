import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import './App.css';
import ProjectDetails from './pages/ProjectDetails';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/create' element={<CreateProject />} />
                <Route path='/project-details/:id' element={<ProjectDetails />} />
            </Routes>
        </>
    );
}

export default App;
