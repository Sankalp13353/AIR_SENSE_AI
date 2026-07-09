import "../styles/dashboard.css";

function StatsCards({ stats }) {
  const formatVal = (val, isFloat = false) => {
    if (val === undefined || val === null) return "0";
    if (isFloat) return val.toFixed(1);
    return typeof val === "number" ? val.toLocaleString() : val;
  };

  const cards = [
    {
      title: "Total Predictions",
      value: formatVal(stats.total_predictions),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-svg">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      iconBg: "rgba(37, 99, 235, 0.1)",
      iconColor: "#2563eb",
      changeText: "+12.5%",
      changeDesc: "from last week",
      changeType: "positive",
      sparkline: (
        <svg viewBox="0 0 100 30" className="sparkline-svg">
          <path d="M0,22 Q20,10 40,25 T80,5 T100,18" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Average AQI",
      value: formatVal(stats.average_aqi, true),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-svg">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      ),
      iconBg: "rgba(16, 185, 129, 0.1)",
      iconColor: "#10b981",
      changeText: "+8.3%",
      changeDesc: "from last week",
      changeType: "positive-warning", // Increase in AQI is slightly worse, but shown green/yellow
      sparkline: (
        <svg viewBox="0 0 100 30" className="sparkline-svg">
          <path d="M0,25 Q15,15 30,22 T60,8 T100,15" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Highest AQI",
      value: formatVal(stats.highest_aqi),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-svg">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      ),
      iconBg: "rgba(249, 115, 22, 0.1)",
      iconColor: "#f97316",
      changeText: "+5.7%",
      changeDesc: "from last week",
      changeType: "negative", // Increase in high AQI is bad (red/orange)
      sparkline: (
        <svg viewBox="0 0 100 30" className="sparkline-svg">
          <path d="M0,25 Q20,20 40,28 T80,10 T100,5" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Lowest AQI",
      value: formatVal(stats.lowest_aqi),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-svg">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12h8"></path>
        </svg>
      ),
      iconBg: "rgba(139, 92, 246, 0.1)",
      iconColor: "#8b5cf6",
      changeText: "-4.3%",
      changeDesc: "from last week",
      changeType: "good", // Decrease in AQI is good (green)
      sparkline: (
        <svg viewBox="0 0 100 30" className="sparkline-svg">
          <path d="M0,5 Q20,15 40,10 T80,25 T100,20" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
  ];

  return (
    <div id="stats-section" className="stats-grid">
      {cards.map((card, index) => (
        <div className="stat-card card" key={index}>
          <div className="stat-card-top">
            <div
              className="stat-icon-wrapper"
              style={{ backgroundColor: card.iconBg, color: card.iconColor }}
            >
              {card.icon}
            </div>
            <span className="stat-card-title">{card.title}</span>
          </div>

          <div className="stat-card-body">
            <h1 className="stat-value">{card.value}</h1>
          </div>

          <div className="stat-card-bottom">
            <div className="stat-trend-info">
              <span className={`trend-pct ${card.changeType}`}>
                {card.changeText}
              </span>
              <span className="trend-desc">{card.changeDesc}</span>
            </div>
            <div className="stat-sparkline">{card.sparkline}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;