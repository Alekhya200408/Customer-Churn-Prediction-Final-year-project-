
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  TrendingUp,
  UserCheck,
  Activity
} from "lucide-react";

const Dashboard = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/predictions"
        );

        setPredictions(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load prediction data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  const total = predictions.length;

  const churned = predictions.filter(
    (item) => item.prediction === "Churn"
  ).length;

  const retained = predictions.filter(
    (item) => item.prediction === "No Churn"
  ).length;

  const averageRisk = total
    ? (
        predictions.reduce(
          (sum, item) => sum + item.churnProbability,
          0
        ) / total
      ) * 100
    : 0;

  const cards = [
    {
      title: "Total Predictions",
      value: total,
      icon: Users,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Predicted Churn",
      value: churned,
      icon: TrendingUp,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Predicted Retained",
      value: retained,
      icon: UserCheck,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Average Churn Risk",
      value: `${averageRisk.toFixed(2)}%`,
      icon: Activity,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  if (loading) {
    return <p className="text-slate-500">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-1">
          Monitor your customer churn predictions.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon size={22} />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-slate-800 mt-5">
                {card.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Recent Predictions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm mt-8 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-5">
          Recent Predictions
        </h2>

        {predictions.length === 0 ? (
          <p className="text-slate-500">
            No predictions available yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-sm text-slate-500">
                  <th className="py-3">Customer</th>
                  <th className="py-3">Prediction</th>
                  <th className="py-3">Churn Risk</th>
                  <th className="py-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {predictions.slice(0, 5).map((item) => (
                  <tr key={item._id} className="border-b last:border-0">
                    <td className="py-4 text-slate-700">
                      Customer #{item._id.slice(-5)}
                    </td>

                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.prediction === "Churn"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                        {item.prediction}
                      </span>
                    </td>

                    <td className="py-4 text-slate-700">
                      {(item.churnProbability * 100).toFixed(2)}%
                    </td>

                    <td className="py-4 text-sm text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
