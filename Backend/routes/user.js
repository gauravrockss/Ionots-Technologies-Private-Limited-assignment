import express from 'express';
import User from '../models/user.js'; // Adjust the path if needed

const router = express.Router();

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users); // Respond with the list of users
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching users.' });
    }
});

export default router;
