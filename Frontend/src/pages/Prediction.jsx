
import { useState } from "react";

import PersonalInfo from "../components/Prediction/PersonalInfo";
import ServicesInfo from "../components/Prediction/ServiceInfo";
import BillingInfo from "../components/Prediction/BillingInfo";
import ReviewPrediction from "../components/Prediction/ReviewPrediction";

const Prediction = () => {

  const [currentStep, setCurrentStep] = useState(1);

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

  return (
    <div>

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
                  onPredict={() => alert("Next we'll connect the ML prediction API!")}
              />
          )}

    </div>
  );
};

export default Prediction;
