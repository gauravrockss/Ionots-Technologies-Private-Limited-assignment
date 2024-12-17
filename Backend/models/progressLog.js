import mongoose from 'mongoose';

const progressLogSchema = new mongoose.Schema(
    {
        task_name: { type: String, required: true },
        progress_percentage: { type: Number, required: true },
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    },
    {
        timestamps: true,
    }
);

// A sample method for calculating the score (this should be adapted to your needs)
progressLogSchema.methods.calculateScore = async function () {
    // Example of calculating score based on progress_percentage
    const score = this.progress_percentage; // For simplicity, we use progress percentage as the score
    this.score = score; // Store the calculated score in the log
    await this.save(); // Save the updated progress log
};

const ProgressLog = mongoose.model('ProgressLog', progressLogSchema);

export default ProgressLog;
