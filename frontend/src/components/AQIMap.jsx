import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function AQIMap({ prediction, selectedCity }) {
  if (!selectedCity) return null;

  return (
    <div className="history-card">
      <h2>AQI Map</h2>

      <MapContainer
        center={[
          selectedCity.latitude,
          selectedCity.longitude,
        ]}
        zoom={10}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "15px",
          marginTop: "20px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[
            selectedCity.latitude,
            selectedCity.longitude,
          ]}
        >
          <Popup>
            <h3>{selectedCity.city}</h3>

            <p>
              AQI :
              {" "}
              {prediction?.predicted_aqi?.toFixed(2)}
            </p>

            <p>{prediction?.category}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default AQIMap;