import { useState } from "react";

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

  const handleCityChange = (e) => {
    const city = cities.find(
      (item) => item.city === e.target.value
    );

    setCity(city);
  };

  const handleSubmit = async () => {
    try {
      setSelectedCity(selectedCity);

      const payload = {
        city: selectedCity.city,
        state: selectedCity.state,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,

        ...profiles[selectedCity.profile],
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
    <div className="card prediction-form">
      <h2>Predict AQI</h2>

      <label>City</label>

      <select
        value={selectedCity.city}
        onChange={handleCityChange}
      >
        {cities.map((city) => (
          <option
            key={city.city}
            value={city.city}
          >
            {city.city}
          </option>
        ))}
      </select>

      <label>State</label>

      <input
        value={selectedCity.state}
        disabled
      />

      <button onClick={handleSubmit}>
        Predict AQI
      </button>
    </div>
  );
}

export default PredictionForm;