// models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assume you have a User model
    },
    deadline: Date,
    status: {
        type: String,
        enum: ['not-started', 'in-progress', 'completed', 'accepted'],
        default: 'not-started',
    },
    is_accepted: {
        type: Boolean,
        default: false,
    },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
