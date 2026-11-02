
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Users,
    TrendingUp,
    UserCheck,
    Activity
} from "lucide-react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";


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

    const riskChartData = predictions.slice(0, 5).map((item) => ({
        name: item.customerName || `Customer ${item._id.slice(-5)}`,
        risk: Number((item.churnProbability * 100).toFixed(2))
    }));

    const highRisk = predictions.filter(
        (item) => item.churnProbability * 100 > 70
    ).length;

    const mediumRisk = predictions.filter(
        (item) => {
            const risk = item.churnProbability * 100;
            return risk >= 40 && risk <= 70;
        }
    ).length;

    const lowRisk = predictions.filter(
        (item) => item.churnProbability * 100 < 40
    ).length;


    const getRecommendation = (probability) => {
        const risk = probability * 100;

        if (risk > 70) {
            return {
                level: "High Risk",
                message: "Contact the customer and offer personalized discounts.",
                color: "bg-red-50 border-red-200 text-red-700"
            };
        }

        if (risk >= 40) {
            return {
                level: "Medium Risk",
                message: "Monitor customer satisfaction and engagement.",
                color: "bg-yellow-50 border-yellow-200 text-yellow-700"
            };
        }

        return {
            level: "Low Risk",
            message: "Maintain engagement and reward customer loyalty.",
            color: "bg-green-50 border-green-200 text-green-700"
        };
    };


    const chartData = [
        {
            name: "Churn",
            value: churned
        },
        {
            name: "No Churn",
            value: retained
        }
    ];

    const COLORS = ["#EF4444", "#22C55E"];

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
                                        <th className="py-3">Recommendation</th>
                                        <th className="py-3">Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {predictions.slice(0, 5).map((item) => {
                                        const recommendation = getRecommendation(
                                            item.churnProbability
                                        );

                                        return (
                                            <tr
                                                key={item._id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="py-4 text-slate-700 font-medium">
                                                    {item.customerName || "Unknown Customer"}
                                                </td>

                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.prediction === "Churn"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-green-100 text-green-600"
                                                        }`}>
                                                        {item.prediction}
                                                    </span>
                                                </td>

                                                <td className="py-4 text-slate-700">
                                                    {(item.churnProbability * 100).toFixed(2)}%
                                                </td>

                                                <td className="py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className={`text-xs font-semibold ${recommendation.level === "High Risk"
                                                                ? "text-red-600"
                                                                : recommendation.level === "Medium Risk"
                                                                    ? "text-yellow-600"
                                                                    : "text-green-600"
                                                            }`}>
                                                            {recommendation.level}
                                                        </span>

                                                        <span className="text-xs text-slate-500">
                                                            {recommendation.message}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="py-4 text-sm text-slate-500">
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Churn Distribution Chart */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm mt-8 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-2">
                    Churn Distribution
                </h2>

                <p className="text-sm text-slate-500 mb-5">
                    Distribution of predicted customer outcomes.
                </p>

                {total === 0 ? (
                    <p className="text-slate-500">
                        No prediction data available.
                    </p>
                ) : (
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={105}
                                    paddingAngle={4}
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={entry.name}
                                            fill={COLORS[index]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div className="flex justify-center gap-6 mt-3">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-sm text-slate-600">
                            Churn ({churned})
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-sm text-slate-600">
                            No Churn ({retained})
                        </span>
                    </div>
                </div>
            </div>

            {/* Customer Churn Risk Chart */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm mt-8 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-2">
                    Customer Churn Risk Analysis
                </h2>

                <p className="text-sm text-slate-500 mb-5">
                    Churn probability of the latest 5 customers.
                </p>

                {riskChartData.length === 0 ? (
                    <p className="text-slate-500">
                        No prediction data available.
                    </p>
                ) : (
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={riskChartData}
                                margin={{ top: 10, right: 20, left: 5, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />

                                <YAxis
                                    domain={[0, 100]}
                                    tickFormatter={(value) => `${value}%`}
                                />

                                <Tooltip
                                    formatter={(value) => [`${value}%`, "Churn Risk"]}
                                />

                                <Bar
                                    dataKey="risk"
                                    fill="#6366F1"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* Prediction Insights */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm mt-8 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-2">
                    Prediction Insights
                </h2>

                <p className="text-sm text-slate-500 mb-5">
                    Customer distribution based on churn probability.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                    {/* High Risk */}
                    <div className="p-5 rounded-xl bg-red-50 border border-red-100">
                        <p className="text-sm text-red-600 font-medium">
                            High Risk
                        </p>
                        <h3 className="text-3xl font-bold text-red-700 mt-2">
                            {highRisk}
                        </h3>
                        <p className="text-xs text-red-500 mt-1">
                            Above 70% churn probability
                        </p>
                    </div>

                    {/* Medium Risk */}
                    <div className="p-5 rounded-xl bg-yellow-50 border border-yellow-100">
                        <p className="text-sm text-yellow-600 font-medium">
                            Medium Risk
                        </p>
                        <h3 className="text-3xl font-bold text-yellow-700 mt-2">
                            {mediumRisk}
                        </h3>
                        <p className="text-xs text-yellow-600 mt-1">
                            Between 40% and 70%
                        </p>
                    </div>

                    {/* Low Risk */}
                    <div className="p-5 rounded-xl bg-green-50 border border-green-100">
                        <p className="text-sm text-green-600 font-medium">
                            Low Risk
                        </p>
                        <h3 className="text-3xl font-bold text-green-700 mt-2">
                            {lowRisk}
                        </h3>
                        <p className="text-xs text-green-600 mt-1">
                            Below 40% churn probability
                        </p>
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default Dashboard;
