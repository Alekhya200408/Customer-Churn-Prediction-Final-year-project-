
import {
  ArrowLeft,
  BrainCircuit,
  User,
  Wifi,
  CreditCard
} from "lucide-react";

const ReviewPrediction = ({ formData, prevStep, onPredict }) => {

  const sections = [
    {
      title: "Personal Information",
      icon: User,
      fields: [
        ["Customer Name", "customerName"],
        ["Gender", "gender"],
        ["Senior Citizen", "SeniorCitizen"],
        ["Partner", "Partner"],
        ["Dependents", "Dependents"]
      ]
    },
    {
      title: "Services Information",
      icon: Wifi,
      fields: [
        ["Phone Service", "PhoneService"],
        ["Multiple Lines", "MultipleLines"],
        ["Internet Service", "InternetService"],
        ["Online Security", "OnlineSecurity"],
        ["Online Backup", "OnlineBackup"],
        ["Device Protection", "DeviceProtection"],
        ["Tech Support", "TechSupport"],
        ["Streaming TV", "StreamingTV"],
        ["Streaming Movies", "StreamingMovies"]
      ]
    },
    {
      title: "Billing & Contract",
      icon: CreditCard,
      fields: [
        ["Tenure (Months)", "tenure"],
        ["Contract", "Contract"],
        ["Paperless Billing", "PaperlessBilling"],
        ["Payment Method", "PaymentMethod"],
        ["Monthly Charges", "MonthlyCharges"],
        ["Total Charges", "TotalCharges"]
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <BrainCircuit size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Review & Predict
            </h1>

            <p className="text-sm text-slate-500">
              Step 4 of 4 — Review customer details before prediction
            </p>
          </div>
        </div>

        <div className="w-full bg-slate-200 h-2 rounded-full">
          <div className="w-full bg-blue-600 h-2 rounded-full"></div>
        </div>
      </div>

      {sections.map((section) => {
        const Icon = section.icon;

        return (
          <div
            key={section.title}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Icon size={21} />
              </div>

              <h2 className="font-semibold text-lg text-slate-800">
                {section.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {section.fields.map(([label, key]) => (
                <div key={key}>
                  <p className="text-xs text-slate-500 mb-1">
                    {label}
                  </p>

                  <p className="text-sm font-medium text-slate-800">
                    {formData[key] !== "" && formData[key] !== undefined
                      ? formData[key]
                      : "Not provided"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="flex justify-between mb-8">

        <button
          type="button"
          onClick={prevStep}
          className="flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Previous
        </button>

        <button
          type="button"
          onClick={onPredict}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          <BrainCircuit size={18} />
          Predict Customer Churn
        </button>

      </div>

    </div>
  );
};

export default ReviewPrediction;
