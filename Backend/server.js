import express from 'express'
import cors from 'cors'
import axios from 'axios';
import "dotenv/config";
import DBconn from "./DB/dbConn.js";

import mongoose from "mongoose";
import Prediction from "./models/Prediction.js";

const app=express()


app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Customer Churn Node.js API is running"
    });
});

// Prediction route

app.post("/api/predict", async (req, res) => {
    try {
        const customerData = req.body;

        // 1. Get prediction from Python ML API
        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            customerData
        );

        const result = response.data;

        // 2. Save prediction in MongoDB
        const savedPrediction = await Prediction.create({
            customer: customerData,
            prediction: result.prediction,
            churnProbability: result.churn_probability
        });

        // 3. Send response to client
        res.status(201).json({
            prediction: result.prediction,
            churn_probability: result.churn_probability,
            churn_probability_percentage:
                result.churn_probability_percentage,
            recordId: savedPrediction._id,
            message: "Prediction saved successfully"
        });

    } catch (error) {
        console.error(
            "Prediction error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to predict or save customer churn"
        });
    }
});


app.get("/api/predictions", async (req, res) => {
    try {
        const predictions = await Prediction.find()
            .sort({ createdAt: -1 })
            .limit(100);

        res.status(200).json(predictions);
    } catch (error) {
        console.error("History error:", error.message);

        res.status(500).json({
            message: "Failed to fetch prediction history"
        });
    }
});



DBconn().then(() => {
    app.listen(3000, () => {
        console.log("App is running on port 3000");
    });
});
