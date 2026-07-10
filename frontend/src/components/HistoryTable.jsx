import { useState } from "react";
import "../styles/dashboard.css";
import { deletePrediction } from "../api/predictionService";

function HistoryTable({ history, refreshDashboard }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Map AQI to category status class and text
  const getAQIMeta = (aqi) => {
    if (aqi <= 50) return { key: "good", label: "Good" };
    if (aqi <= 100) return { key: "moderate", label: "Moderate" };
    if (aqi <= 150) return { key: "sensitive", label: "Unhealthy for Sensitive Groups" };
    if (aqi <= 200) return { key: "unhealthy", label: "Unhealthy" };
    if (aqi <= 300) return { key: "very-unhealthy", label: "Very Unhealthy" };
    return { key: "hazardous", label: "Hazardous" };
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      // Format like "24 May 2024, 10:30 AM"
      const day = d.getDate();
      const month = d.toLocaleString("en-US", { month: "short" });
      const year = d.getFullYear();
      const time = d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
      return `${day} ${month} ${year}, ${time}`;
    } catch (e) {
      return dateStr;
    }
  };

  // Filter history based on search query
  const filteredHistory = history.filter((item) =>
    item.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id, city) => {
    if (window.confirm(`Are you sure you want to delete the prediction for ${city}?`)) {
      try {
        await deletePrediction(id);
        if (refreshDashboard) {
          refreshDashboard();
        }
      } catch (err) {
        console.error("Error deleting prediction:", err);
      }
    }
  };

  return (
    <div id="history-section" className="card history-card">
      <div className="history-header">
        <div className="history-title-group">
          <div className="card-title-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="title-icon-svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h2>Recent Predictions</h2>
        </div>

        {/* Search bar */}
        <div className="search-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>City</th>
              <th>AQI</th>
              <th>Category</th>
              <th>Date & Time</th>
              <th style={{ width: "50px" }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "var(--text-light)", padding: "30px" }}>
                  No predictions found.
                </td>
              </tr>
            ) : (
              filteredHistory.slice(0, 5).map((item) => {
                const meta = getAQIMeta(item.predicted_aqi);
                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600 }}>{item.city}</td>
                    <td>
                      <span className={`aqi-col-value ${meta.key}`}>
                        {item.predicted_aqi.toFixed(0)}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${meta.key}`}>
                        {meta.label}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                      {formatDate(item.prediction_time)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id, item.city)}
                        title="Delete prediction"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="history-footer">
        <a href="#history-section" className="view-all-link">
          <span>View All History</span>
          <svg className="arrow-right-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default HistoryTable;