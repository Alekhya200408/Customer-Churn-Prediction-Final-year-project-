
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  History as HistoryIcon,
  RefreshCw,
  Search,
  X
} from "lucide-react";

const History = () => {
  const navigate = useNavigate();

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch prediction history
  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:3000/api/predictions"
      );

      setPredictions(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load prediction history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Search and filter
  const filteredPredictions = useMemo(() => {
    return predictions.filter((item) => {
      const matchesSearch = (item.customerName || "")
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesFilter =
        filter === "All" || item.prediction === filter;

      return matchesSearch && matchesFilter;
    });
  }, [predictions, search, filter]);

  return (
    <div className="w-full">

      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <HistoryIcon className="text-blue-600" size={30} />

            <h1 className="text-3xl font-bold text-slate-800">
              Prediction History
            </h1>
          </div>

          <p className="text-slate-500 mt-2">
            View and manage previously generated predictions.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition disabled:opacity-50"
        >
          <RefreshCw size={18} />
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">

          <div className="relative flex-1 min-w-0">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer name..."
              style={{ paddingLeft: "48px" }}
              className="w-full h-12 border border-slate-300 rounded-xl pr-12 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-12 min-w-[180px] border border-slate-300 rounded-xl px-4 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
          >
            <option value="All">All Predictions</option>
            <option value="Churn">Churn</option>
            <option value="No Churn">No Churn</option>
          </select>

        </div>
      </div>

      {/* Prediction Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">

        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-800">
            All Predictions
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Showing {filteredPredictions.length} of {predictions.length} records
          </p>
        </div>

        {loading ? (
          <div className="py-10 text-center text-slate-500">
            <RefreshCw className="animate-spin mx-auto mb-3" size={25} />
            Loading prediction history...
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-600">
            {error}
            <button
              onClick={fetchHistory}
              className="underline ml-2"
            >
              Try again
            </button>
          </div>
        ) : filteredPredictions.length === 0 ? (
          <div className="py-10 text-center">
            <Search className="mx-auto text-slate-300 mb-3" size={35} />

            <h3 className="font-semibold text-slate-700">
              No predictions found
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Try another customer name or filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="text-blue-600 hover:underline mt-3 text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="py-4 pr-4">Customer Name</th>
                  <th className="py-4 pr-4">Prediction</th>
                  <th className="py-4 pr-4">Churn Risk</th>
                  <th className="py-4 pr-4">Contract</th>
                  <th className="py-4 pr-4">Tenure</th>
                  <th className="py-4 pr-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredPredictions.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => {
                      navigate(`/history/${item._id}`);
                    }}
                    title="Click to view customer details"
                    className="border-b border-slate-100 last:border-0 hover:bg-blue-50 transition cursor-pointer"
                  >
                    <td className="py-4 pr-4 font-medium text-slate-800">
                      {item.customerName || "Unknown"}
                    </td>

                    <td className="py-4 pr-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.prediction === "Churn"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.prediction}
                      </span>
                    </td>

                    <td className="py-4 pr-4 text-slate-700">
                      {(item.churnProbability * 100).toFixed(2)}%
                    </td>

                    <td className="py-4 pr-4 text-slate-700">
                      {item.customer?.Contract || "-"}
                    </td>

                    <td className="py-4 pr-4 text-slate-700">
                      {item.customer?.tenure ?? "-"} months
                    </td>

                    <td className="py-4 pr-4 text-sm text-slate-500">
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

export default History;
