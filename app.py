from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import pandas as pd
import joblib
from pathlib import Path

# Initialize FastAPI
app = FastAPI(
    title="Customer Churn Prediction API",
    description="Predict customer churn using a trained ML model",
    version="1.0.0"
)

# Load the trained model
MODEL_PATH = Path(__file__).parent / "churn_model.joblib"
model = joblib.load(MODEL_PATH)


# Define the customer input structure
class CustomerData(BaseModel):
    gender: str
    SeniorCitizen: int = Field(ge=0, le=1)
    Partner: str
    Dependents: str
    tenure: int = Field(ge=0, le=72)

    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str

    Contract: str
    PaperlessBilling: str
    PaymentMethod: str

    MonthlyCharges: float = Field(ge=0)
    TotalCharges: float = Field(ge=0)


# Home route
@app.get("/")
def home():
    return {
        "message": "Customer Churn Prediction API is running"
    }


# Prediction route
@app.post("/predict")
def predict_churn(customer: CustomerData):

    try:
        # Convert incoming customer data to a dictionary
        customer_data = customer.model_dump()

        # Create a DataFrame with one customer
        input_df = pd.DataFrame([customer_data])

        # Generate prediction
        prediction = int(model.predict(input_df)[0])

        # Find the probability associated with the churn class
        classes = list(model.classes_)
        churn_index = classes.index(1)

        probability = float(
            model.predict_proba(input_df)[0][churn_index]
        )

        # Convert the prediction into a readable result
        result = "Churn" if prediction == 1 else "No Churn"

        return {
            "prediction": result,
            "churn_probability": round(probability, 4),
            "churn_probability_percentage": round(
                probability * 100, 2
            )
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(error)}"
        )