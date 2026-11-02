
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeft,
  User,
  BrainCircuit
} from "lucide-react";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state?.result;

  // Handle direct access without prediction data
  if (!result) {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow-sm">
        <AlertTriangle className="mx-auto text-amber-500 mb-4" size={40} />
        <h2 className="text-xl font-bold text-slate-800">
          No Prediction Found
        </h2>
        <p className="text-slate-500 mt-2">
          Please submit customer details first.
        </p>
        <button
          onClick={() => navigate("/prediction")}
          className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          New Prediction
        </button>
      </div>
    );
  }

  const isChurn = result.prediction === "Churn";
  const probability = Number(result.churn_probability_percentage);

  return (
    <div className="max-w-4xl mx-auto">

      {/* Heading */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <BrainCircuit size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Prediction Result
            </h1>
            <p className="text-sm text-slate-500">
              ML model analysis completed successfully
            </p>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">

        <div className="text-center">

          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
            isChurn
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}>
            {isChurn
              ? <AlertTriangle size={40} />
              : <CheckCircle size={40} />
            }
          </div>

          <p className="text-slate-500 mt-5">
            Prediction for
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-1">
            {result.customerName}
          </h2>

          <h3 className={`text-3xl font-bold mt-5 ${
            isChurn ? "text-red-600" : "text-green-600"
          }`}>
            {result.prediction}
          </h3>

          <p className="text-slate-500 mt-2">
            {isChurn
              ? "This customer is predicted to leave the service."
              : "This customer is predicted to continue the service."
            }
          </p>

        </div>

        {/* Probability */}
        <div className="mt-10 bg-slate-50 rounded-xl p-6">

          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-slate-700">
              Churn Probability
            </span>

            <span className="text-2xl font-bold text-slate-800">
              {probability.toFixed(2)}%
            </span>
          </div>

          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                isChurn ? "bg-red-500" : "bg-green-500"
              }`}
              style={{
                width: `${Math.min(100, Math.max(0, probability))}%`
              }}
            />
          </div>

          <p className="text-xs text-slate-500 mt-3">
            Probability estimated by the trained machine learning model.
          </p>

        </div>

        {/* Customer details */}
        <div className="mt-6 border-t border-slate-200 pt-6">
          <div className="flex items-center gap-2 mb-3">
            <User size={20} className="text-blue-600" />
            <h3 className="font-semibold text-slate-800">
              Prediction Information
            </h3>
          </div>

          <p className="text-sm text-slate-600">
            Record ID: {result.recordId}
          </p>
        </div>

      </div>

      {/* Actions */}
      <div className="flex justify-between mt-6">

        <button
          onClick={() => navigate("/prediction")}
          className="flex items-center gap-2 border border-slate-300 px-5 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          New Prediction
        </button>

        <button
          onClick={() => navigate("/history")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          View History
        </button>

      </div>

    </div>
  );
};

export default Result;
