import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    is_candidate: {
        type: Boolean,
        default: true,
    },
});

const User = mongoose.model('User', userSchema);
export default User;
