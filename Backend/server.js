import express from 'express'
import cors from 'cors'
import axios from 'axios';


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

        // Send customer data to the Python ML API
        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            customerData
        );

        // Return the ML prediction to the client
        res.json(response.data);

    } catch (error) {
        console.error(
            "Prediction error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Failed to predict customer churn"
        });
    }
});

app.listen(3000,()=>{
    console.log("App is running on port 3000");
    
})