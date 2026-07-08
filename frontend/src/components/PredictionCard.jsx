import "../styles/prediction.css";

function PredictionCard({ prediction }) {
  if (!prediction) {
    return (
      <div className="card prediction-card">
        <h2>Prediction Result</h2>
        <p>No prediction yet.</p>
      </div>
    );
  }

  return (
    <div className="card prediction-card">
      <h2>Prediction Result</h2>

      <div className="aqi-value">
        {prediction.predicted_aqi.toFixed(2)}
      </div>

      <div
        className="badge"
        style={{
          backgroundColor: prediction.color,
        }}
      >
        {prediction.category}
      </div>

      <p className="advice">
        {prediction.health_advisory}
      </p>
    </div>
  );
}

export default PredictionCard;