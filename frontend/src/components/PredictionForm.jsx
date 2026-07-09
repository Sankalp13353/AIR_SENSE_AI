import { useState, useEffect } from "react";
import { predictAQI } from "../api/predictionService";
import cities from "../assets/cities.json";
import { profiles } from "../assets/cityFeatures";
import "../styles/prediction.css";

function PredictionForm({
  setPrediction,
  refreshDashboard,
  setSelectedCity,
}) {
  const [selectedCity, setCity] = useState(cities[0]);

  // Form input states
  const [so2, setSo2] = useState("");
  const [pm25, setPm25] = useState("");
  const [co, setCo] = useState("");
  const [pm10, setPm10] = useState("");
  const [o3, setO3] = useState("");
  const [no2, setNo2] = useState("");
  const [nh3, setNh3] = useState("12"); // Default NH3 placeholder

  // Load profile values on city change
  useEffect(() => {
    const profile = profiles[selectedCity.profile];
    if (profile) {
      setSo2(String(profile.so2_ugm3 || 10));
      setPm25(String(profile.pm2_5_ugm3 || 35));
      setCo(String((profile.co_ugm3 || 500) / 1000)); // Display in ppm
      setPm10(String(profile.pm10_ugm3 || 60));
      setO3(String(profile.o3_ugm3 || 20));
      setNo2(String(profile.no2_ugm3 || 15));
    }
  }, [selectedCity]);

  const handleCityChange = (e) => {
    const city = cities.find(
      (item) => item.city === e.target.value
    );
    if (city) {
      setCity(city);
    }
  };

  const handleSubmit = async () => {
    try {
      setSelectedCity(selectedCity);

      const payload = {
        city: selectedCity.city,
        state: selectedCity.state,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,

        // Spread base profile attributes
        ...profiles[selectedCity.profile],

        // Override with user values (converting CO ppm back to ugm3)
        pm2_5_ugm3: parseFloat(pm25),
        pm10_ugm3: parseFloat(pm10),
        co_ugm3: parseFloat(co) * 1000,
        no2_ugm3: parseFloat(no2),
        so2_ugm3: parseFloat(so2),
        o3_ugm3: parseFloat(o3),
      };

      const response = await predictAQI(payload);
      setPrediction(response);
      await refreshDashboard();
    } catch (err) {
      console.error(err);
      alert("Prediction Failed");
    }
  };

  return (
    <div id="predict-form-section" className="card prediction-form">
      <div className="form-header">
        <div className="form-title-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="title-icon-svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <h2>Predict Air Quality Index</h2>
      </div>

      <div className="form-grid">
        {/* City Input */}
        <div className="form-group full-width">
          <label htmlFor="city-select">City</label>
          <div className="select-wrapper">
            <select
              id="city-select"
              value={selectedCity.city}
              onChange={handleCityChange}
            >
              {cities.map((city) => (
                <option key={city.city} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
            <svg className="select-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        {/* SO2 */}
        <div className="form-group">
          <label htmlFor="input-so2">SO₂ <span className="unit">(ppb)</span></label>
          <input
            id="input-so2"
            type="number"
            value={so2}
            onChange={(e) => setSo2(e.target.value)}
          />
        </div>

        {/* PM2.5 */}
        <div className="form-group">
          <label htmlFor="input-pm25">PM2.5 <span className="unit">(µg/m³)</span></label>
          <input
            id="input-pm25"
            type="number"
            value={pm25}
            onChange={(e) => setPm25(e.target.value)}
          />
        </div>

        {/* CO */}
        <div className="form-group">
          <label htmlFor="input-co">CO <span className="unit">(ppm)</span></label>
          <input
            id="input-co"
            type="number"
            step="0.1"
            value={co}
            onChange={(e) => setCo(e.target.value)}
          />
        </div>

        {/* PM10 */}
        <div className="form-group">
          <label htmlFor="input-pm10">PM10 <span className="unit">(µg/m³)</span></label>
          <input
            id="input-pm10"
            type="number"
            value={pm10}
            onChange={(e) => setPm10(e.target.value)}
          />
        </div>

        {/* O3 */}
        <div className="form-group">
          <label htmlFor="input-o3">O₃ <span className="unit">(ppb)</span></label>
          <input
            id="input-o3"
            type="number"
            value={o3}
            onChange={(e) => setO3(e.target.value)}
          />
        </div>

        {/* NO2 */}
        <div className="form-group">
          <label htmlFor="input-no2">NO₂ <span className="unit">(ppb)</span></label>
          <input
            id="input-no2"
            type="number"
            value={no2}
            onChange={(e) => setNo2(e.target.value)}
          />
        </div>

        {/* NH3 (Dummy visual field to match mockup) */}
        <div className="form-group">
          <label htmlFor="input-nh3">NH₃ <span className="unit">(ppb)</span></label>
          <input
            id="input-nh3"
            type="number"
            value={nh3}
            onChange={(e) => setNh3(e.target.value)}
          />
        </div>
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="btn-icon">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
        Predict AQI
      </button>
    </div>
  );
}

export default PredictionForm;