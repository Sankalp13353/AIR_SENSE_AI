import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import PredictionForm from "../components/PredictionForm";
import PredictionCard from "../components/PredictionCard";
import StatsCards from "../components/StatsCards";
import HistoryTable from "../components/HistoryTable";
import AQIMap from "../components/AQIMap";
import AdvisoryBot from "../components/AdvisoryBot";

import {
  getPredictionHistory,
  getPredictionStats,
} from "../api/predictionService";

function Dashboard() {
  const [prediction, setPrediction] = useState(null);

  const [history, setHistory] = useState([]);

  const [stats, setStats] = useState({});

  const [selectedCity, setSelectedCity] = useState(null);

  const loadDashboard = async () => {
    try {
      const historyData = await getPredictionHistory();

      const statsData = await getPredictionStats();

      setHistory(historyData);

      setStats(statsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div className="app-container">
      {/* Top Header/Navigation bar */}
      <Navbar />

      {/* Main Dashboard Layout */}
      <main className="dashboard-content">
        
        {/* Row 1: Predict AQI Form & Result Card */}
        <div className="top-section">
          <PredictionForm
            setPrediction={setPrediction}
            refreshDashboard={loadDashboard}
            setSelectedCity={setSelectedCity}
          />

          <PredictionCard
            prediction={prediction}
            setPrediction={setPrediction}
            refreshDashboard={loadDashboard}
          />
        </div>

        {/* Row 2: Stats Cards Grid */}
        <StatsCards stats={stats} />

        {/* Row 3: Bottom Cards Grid */}
        <div className="bottom-grid">
          <AQIMap
            prediction={prediction}
            selectedCity={selectedCity}
          />
          
          <HistoryTable
            history={history}
            refreshDashboard={loadDashboard}
            prediction={prediction}
            setPrediction={setPrediction}
          />
        </div>
      </main>

      {/* Floating AI Assistant Chatbot */}
      <AdvisoryBot prediction={prediction} />
    </div>
  );
}

export default Dashboard;