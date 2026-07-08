import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import PredictionForm from "../components/PredictionForm";
import PredictionCard from "../components/PredictionCard";
import StatsCards from "../components/StatsCards";
import HistoryTable from "../components/HistoryTable";
import AQIMap from "../components/AQIMap";

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
    <>
      <Navbar />

      <div className="container">
        <div className="top-section">
          <PredictionForm
            setPrediction={setPrediction}
            refreshDashboard={loadDashboard}
            setSelectedCity={setSelectedCity}
          />

          <PredictionCard prediction={prediction} />
        </div>

        <StatsCards stats={stats} />

        <HistoryTable history={history} />

        <AQIMap
          prediction={prediction}
          selectedCity={selectedCity}
        />
      </div>
    </>
  );
}

export default Dashboard;