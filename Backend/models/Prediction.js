import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        prediction: {
            type: String,
            enum: ["Churn", "No Churn"],
            required: true
        },
        churnProbability: {
            type: Number,
            required: true,
            min: 0,
            max: 1
        }
    },
    { timestamps: true }
);

const Prediction = mongoose.model(
    "Prediction",
    predictionSchema
);

export default Prediction;