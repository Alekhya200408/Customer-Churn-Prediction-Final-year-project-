
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  ArrowLeft,
  User,
  Wifi,
  CreditCard,
  BrainCircuit,
  CalendarDays,
  LoaderCircle
} from "lucide-react";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch one customer prediction
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/predictions/${id}`
        );

        setCustomer(response.data);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
          "Unable to load customer details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <LoaderCircle size={35} className="animate-spin mb-3 text-blue-600" />
        Loading customer details...
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow-sm">
        <p className="text-red-600 mb-4">
          {error || "Customer not found."}
        </p>

        <button
          onClick={() => navigate("/history")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Back to History
        </button>
      </div>
    );
  }

  const data = customer.customer;

  // Reusable section component
  const DetailSection = ({ title, icon: Icon, fields }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <Icon size={22} />
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(([label, value]) => (
          <div key={label}>
            <p className="text-sm text-slate-500 mb-1">
              {label}
            </p>

            <p className="font-medium text-slate-800 break-words">
              {value ?? "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const personalFields = [
    ["Customer Name", customer.customerName],
    ["Gender", data.gender],
    ["Senior Citizen", data.SeniorCitizen === 1 ? "Yes" : "No"],
    ["Partner", data.Partner],
    ["Dependents", data.Dependents]
  ];

  const serviceFields = [
    ["Phone Service", data.PhoneService],
    ["Multiple Lines", data.MultipleLines],
    ["Internet Service", data.InternetService],
    ["Online Security", data.OnlineSecurity],
    ["Online Backup", data.OnlineBackup],
    ["Device Protection", data.DeviceProtection],
    ["Tech Support", data.TechSupport],
    ["Streaming TV", data.StreamingTV],
    ["Streaming Movies", data.StreamingMovies]
  ];

  const billingFields = [
    ["Tenure", `${data.tenure} months`],
    ["Contract", data.Contract],
    ["Paperless Billing", data.PaperlessBilling],
    ["Payment Method", data.PaymentMethod],
    ["Monthly Charges", `₹${data.MonthlyCharges}`],
    ["Total Charges", `₹${data.TotalCharges}`]
  ];

  const isChurn = customer.prediction === "Churn";

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-3"
          >
            <ArrowLeft size={18} />
            Back to Prediction History
          </button>

          <h1 className="text-3xl font-bold text-slate-800">
            Customer Details
          </h1>

          <p className="text-slate-500 mt-1">
            Complete customer information and ML prediction.
          </p>
        </div>

      </div>

      {/* Prediction Result */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-5">

          <div>
            <p className="text-sm text-slate-500 mb-2">
              Customer
            </p>

            <h2 className="text-2xl font-bold text-slate-800">
              {customer.customerName}
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Record ID: {customer._id}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-2">
              Prediction Result
            </p>

            <span
              className={`px-4 py-2 rounded-lg font-semibold ${
                isChurn
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {customer.prediction}
            </span>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-2">
              Churn Probability
            </p>

            <p className="text-3xl font-bold text-blue-600">
              {(customer.churnProbability * 100).toFixed(2)}%
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-100 text-sm text-slate-500">
          <CalendarDays size={17} />
          Predicted on: {new Date(customer.createdAt).toLocaleString()}
        </div>

      </div>

      {/* Personal Information */}
      <DetailSection
        title="Personal Information"
        icon={User}
        fields={personalFields}
      />

      {/* Services Information */}
      <DetailSection
        title="Services Information"
        icon={Wifi}
        fields={serviceFields}
      />

      {/* Billing Information */}
      <DetailSection
        title="Billing & Contract"
        icon={CreditCard}
        fields={billingFields}
      />

    </div>
  );
};

export default CustomerDetails;
