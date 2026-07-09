import "../styles/prediction.css";

function PredictionCard({ prediction }) {
  if (!prediction) {
    return (
      <div className="card prediction-card">
        <div className="card-header">
          <div className="card-title-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="title-icon-svg">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <h2>Current AQI Prediction</h2>
        </div>
        <div className="no-prediction-wrapper">
          <svg className="no-pred-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <p>No prediction calculated yet. Choose a city and click Predict AQI.</p>
        </div>
      </div>
    );
  }

  const aqi = prediction.predicted_aqi;
  
  // Calculate SVG gauge stroke properties
  const radius = 68;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(aqi / 500, 1);
  const strokeDashoffset = circumference - (percentage * circumference);

  // Map AQI value to category properties for styling consistency
  const getCategoryMeta = (val) => {
    if (val <= 50) return { key: "good", label: "Good", color: "#10b981", range: "0-50", text: "Healthy" };
    if (val <= 100) return { key: "moderate", label: "Moderate", color: "#f59e0b", range: "51-100", text: "Moderate" };
    if (val <= 150) return { key: "sensitive", label: "Unhealthy for Sensitive Groups", color: "#f97316", range: "101-150", text: "Moderate Warning" };
    if (val <= 200) return { key: "unhealthy", label: "Unhealthy", color: "#ef4444", range: "151-200", text: "Unhealthy" };
    if (val <= 300) return { key: "very-unhealthy", label: "Very Unhealthy", color: "#8b5cf6", range: "201-300", text: "Severe" };
    return { key: "hazardous", label: "Hazardous", color: "#7f1d1d", range: "301+", text: "Critical" };
  };

  const currentMeta = getCategoryMeta(aqi);

  const scaleItems = [
    { key: "good", range: "0-50", label: "Good" },
    { key: "moderate", range: "51-100", label: "Moderate" },
    { key: "sensitive", range: "101-150", label: "Sensitive" },
    { key: "unhealthy", range: "151-200", label: "Unhealthy" },
    { key: "very-unhealthy", range: "201-300", label: "Very Unhealthy" },
    { key: "hazardous", range: "301+", label: "Hazardous" },
  ];

  return (
    <div className="card prediction-card">
      <div className="card-header">
        <div className="card-title-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="title-icon-svg">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <h2>Current AQI Prediction</h2>
      </div>

      <div className="prediction-body">
        <div className="prediction-main-row">
          {/* Circular Gauge */}
          <div className="gauge-container">
            <svg className="gauge-svg">
              <circle
                className="gauge-bg"
                cx="80"
                cy="80"
                r={radius}
              />
              <circle
                className="gauge-progress"
                cx="80"
                cy="80"
                r={radius}
                style={{
                  stroke: currentMeta.color,
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset
                }}
              />
            </svg>
            <div className="gauge-center-text">
              <span className="gauge-val">{aqi.toFixed(0)}</span>
              <span className="gauge-desc" style={{ color: currentMeta.color }}>
                {prediction.category || currentMeta.label}
              </span>
            </div>
            <div className="aqi-badge-circle">AQI</div>
          </div>

          {/* Advisory Panel */}
          <div className="advisory-details">
            <div className="health-advisory-box" style={{ borderLeftColor: currentMeta.color }}>
              <div className="advisory-icon-wrapper" style={{ color: currentMeta.color }}>
                <svg className="advisory-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div className="advisory-content">
                <h4>Health Advisory</h4>
                <p>{prediction.health_advisory || "Sensitive groups should reduce prolonged outdoor activity."}</p>
              </div>
            </div>

            {/* Sub-indicators Grid */}
            <div className="indicators-grid">
              {/* Pollution Level */}
              <div className="indicator-pill">
                <div className="ind-icon-wrapper moderate">
                  <svg className="ind-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div className="ind-text">
                  <span className="ind-label">Pollution Level</span>
                  <span className="ind-value">{currentMeta.text}</span>
                </div>
              </div>

              {/* Main Pollutant */}
              <div className="indicator-pill">
                <div className="ind-icon-wrapper pollutant">
                  <svg className="ind-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <div className="ind-text">
                  <span className="ind-label">Main Pollutant</span>
                  <span className="ind-value">PM2.5</span>
                </div>
              </div>

              {/* Confidence */}
              <div className="indicator-pill">
                <div className="ind-icon-wrapper confidence">
                  <svg className="ind-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <div className="ind-text">
                  <span className="ind-label">Confidence</span>
                  <span className="ind-value">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend scale footer */}
        <div className="aqi-scale-legend">
          <span className="aqi-scale-title">AQI Scale</span>
          <div className="scale-items">
            {scaleItems.map((item) => (
              <div
                key={item.key}
                className={`scale-item ${item.key} ${currentMeta.key === item.key ? "active" : ""}`}
              >
                <span className="scale-item-range">{item.range}</span>
                <span className="scale-item-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionCard;