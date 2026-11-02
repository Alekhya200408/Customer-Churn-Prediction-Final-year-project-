
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PersonalInfo from "../components/Prediction/PersonalInfo";
import ServicesInfo from "../components/Prediction/ServiceInfo";
import BillingInfo from "../components/Prediction/BillingInfo";
import ReviewPrediction from "../components/Prediction/ReviewPrediction";

const Prediction = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    gender: "",
    SeniorCitizen: "",
    Partner: "",
    Dependents: "",

    PhoneService: "",
    MultipleLines: "",
    InternetService: "",
    OnlineSecurity: "",
    OnlineBackup: "",
    DeviceProtection: "",
    TechSupport: "",
    StreamingTV: "",
    StreamingMovies: "",

    tenure: "",
    Contract: "",
    PaperlessBilling: "",
    PaymentMethod: "",
    MonthlyCharges: "",
    TotalCharges: ""
  });

  const updateFormData = (updatedData) => {
    setFormData(updatedData);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Send customer data to Express backend
  const handlePredict = async () => {
    try {
      setLoading(true);
      setError("");

      // Separate customer name from ML features
      const { customerName, ...customerData } = formData;

      // Convert numeric fields into numbers
      const payload = {
        customerName: customerName.trim(),
        ...customerData,
        SeniorCitizen: Number(customerData.SeniorCitizen),
        tenure: Number(customerData.tenure),
        MonthlyCharges: Number(customerData.MonthlyCharges),
        TotalCharges: Number(customerData.TotalCharges)
      };

      // Send request to Express
      const response = await axios.post(
        "http://localhost:3000/api/predict",
        payload
      );

      // Navigate to result page
      navigate("/result", {
        state: {
          result: response.data
        }
      });

    } catch (err) {
      console.error("Prediction error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to generate prediction. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-5">
          {error}
        </div>
      )}

      {currentStep === 1 && (
        <PersonalInfo
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      )}

      {currentStep === 2 && (
        <ServicesInfo
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 3 && (
        <BillingInfo
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 4 && (
        <ReviewPrediction
          formData={formData}
          prevStep={prevStep}
          onPredict={handlePredict}
          loading={loading}
        />
      )}

    </div>
  );
};

export default Prediction;
