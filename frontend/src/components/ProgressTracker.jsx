import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProgressTracker = ({ projectId }) => {
    const [progress, setProgress] = useState([]);
    const [newProgress, setNewProgress] = useState({ task_name: '', progress_percentage: 0 });

    const getProgress = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/progress/${projectId}`);
            setProgress(response.data);
        } catch (e) {
            console.error('Error fetching projects:', e);
        }
    }, []);

    const addProgress = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/progress', { ...newProgress, project: projectId });

            setProgress([...progress, response.data]);
        } catch (e) {
            console.error('Error fetching projects:', e);
        }
    };

    useEffect(() => {
        getProgress();
    }, [getProgress]);

    return (
        <div>
            <h2>Progress Tracker</h2>
            <ul>
                {progress.map(log => (
                    <li key={log._id}>
                        {log.task_name}: {log.progress_percentage}%
                    </li>
                ))}
            </ul>
            <input
                type='text'
                placeholder='Task Name'
                value={newProgress.task_name}
                onChange={e => setNewProgress({ ...newProgress, task_name: e.target.value })}
            />
            <input
                type='number'
                placeholder='Progress %'
                value={newProgress.progress_percentage}
                onChange={e => setNewProgress({ ...newProgress, progress_percentage: e.target.value })}
            />
            <button onClick={addProgress}>Add Progress</button>
        </div>
    );
};

export default ProgressTracker;
