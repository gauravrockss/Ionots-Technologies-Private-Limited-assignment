import { connect } from 'mongoose';
import User from '../models/user.js'; // Adjust the path to your User model

async function connectDB() {
    try {
        const connectionString = process.env.MONGODB_CONNECTION_STRING;

        if (!connectionString) {
            console.log('Connection failed: Connection string must be specified');
            return;
        }

        // Connect to MongoDB
        await connect(connectionString);
        console.log('MongoDB Connected');

        // Check if a default user exists, and if not, create it
        const defaultUser = await User.findOne({ username: 'system' });

        if (!defaultUser) {
            // Create a default user if one does not already exist
            const user = await User.create({
                username: 'system',
                email: 'system@example.com',
                is_candidate: true, // Default value for is_candidate
            });

            console.log('System user created:', user);
        } else {
            console.log('System user already exists');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB or creating user:', error.message);
    }
}

export default connectDB;
