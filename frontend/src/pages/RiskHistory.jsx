// src/pages/RiskHistory.jsx
import React, { useEffect, useState } from "react";

export default function RiskHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/risk-history");
        const data = await res.json();
        // support both { assessments: [...] } and raw array
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.assessments)
          ? data.assessments
          : [];
        setHistory(list);
      } catch (err) {
        console.error(err);
        setError("Failed to load your risk history.");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Loading your past assessments…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Your Past AI Risk Assessments
      </h1>
      {history.length === 0 ? (
        <div className="p-6 bg-yellow-50 rounded-lg text-center">
          <p className="text-gray-700 mb-2">
            You haven’t performed any risk assessments yet.
          </p>
          <a
            href="/risk-assessment"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Take an Assessment
          </a>
        </div>
      ) : (
        <ul className="space-y-6">
          {history.map((item) => {
            const date = new Date(item.date || item.timestamp);
            const formattedDate = date.toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const riskPct = (item.riskScore * 100).toFixed(1);
            const isOpen = expandedId === item.id;

            return (
              <li key={item.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{formattedDate}</p>
                    <h2 className="text-xl font-semibold">
                      Risk:{" "}
                      <span
                        className={
                          item.riskScore < 0.2
                            ? "text-green-600"
                            : item.riskScore < 0.5
                            ? "text-yellow-600"
                            : "text-red-600"
                        }
                      >
                        {riskPct}%
                      </span>
                    </h2>
                  </div>
                  <button
                    onClick={() => setExpandedId(isOpen ? null : item.id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {isOpen ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-4 border-t pt-4 text-gray-700 text-sm space-y-2">
                    <p className="font-medium">Inputs Used:</p>
                    <ul className="list-disc list-inside">
                      {Object.entries(item.features || {}).map(
                        ([key, value]) => (
                          <li key={key}>
                            <span className="font-medium">
                              {key.replace(/_/g, " ")}:
                            </span>{" "}
                            {value}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
