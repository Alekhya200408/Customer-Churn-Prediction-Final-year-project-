
import express from "express";
import cors from "cors";
import axios from "axios";
import cookieParser from "cookie-parser";
import "dotenv/config";

import DBconn from "./src/DB/dbConn.js";
import Prediction from "./src/models/Prediction.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Customer Churn Node.js API is running"
    });
});

// Authentication routes
app.use("/api/auth", userRoutes);


// Create churn prediction
app.post("/api/predict", async (req, res) => {
    try {
        const { customerName, ...customerData } = req.body;

        if (!customerName || !customerName.trim()) {
            return res.status(400).json({
                message: "Customer name is required"
            });
        }

        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            customerData
        );

        const result = response.data;

        const savedPrediction = await Prediction.create({
            customerName: customerName.trim(),
            customer: customerData,
            prediction: result.prediction,
            churnProbability: result.churn_probability
        });

        res.status(201).json({
            customerName: savedPrediction.customerName,
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


// Get prediction history
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


// Get single prediction by ID
app.get("/api/predictions/:id", async (req, res) => {
    try {
        const prediction = await Prediction.findById(req.params.id);

        if (!prediction) {
            return res.status(404).json({
                message: "Prediction not found"
            });
        }

        res.status(200).json(prediction);

    } catch (error) {
        console.error("Prediction details error:", error.message);

        res.status(400).json({
            message: "Unable to fetch prediction details"
        });
    }
});


// Start server after database connection
DBconn().then(() => {
    app.listen(3000, () => {
        console.log("App is running on port 3000");
    });
}).catch((error) => {
    console.error("Database connection failed:", error);
});
