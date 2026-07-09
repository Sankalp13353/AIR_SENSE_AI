import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";
import cities from "../assets/cities.json";
import { profiles } from "../assets/cityFeatures";
import "../styles/map.css";

// Helper component to programmatically pan/zoom map on selection
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
}

function AQIMap({ prediction, selectedCity }) {
  // Center map on selected city, or default to center of India
  const mapCenter = selectedCity
    ? [selectedCity.latitude, selectedCity.longitude]
    : [20.5937, 78.9629];
  const mapZoom = selectedCity ? 8 : 5;

  const getAQIValue = (city, isSelected) => {
    if (isSelected && prediction) {
      return prediction.predicted_aqi;
    }
    const profile = profiles[city.profile];
    if (!profile) return 50;
    // Map profiles to visual AQI ranges
    if (city.profile === "clean") return 46;
    if (city.profile === "moderate") return 68;
    return 118; // polluted
  };

  const getAQIMeta = (aqi) => {
    if (aqi <= 50) return { color: "#10b981", category: "Good" };
    if (aqi <= 100) return { color: "#f59e0b", category: "Moderate" };
    if (aqi <= 150) return { color: "#f97316", category: "Unhealthy for Sensitive Groups" };
    if (aqi <= 200) return { color: "#ef4444", category: "Unhealthy" };
    if (aqi <= 300) return { color: "#8b5cf6", category: "Very Unhealthy" };
    return { color: "#7f1d1d", category: "Hazardous" };
  };

  return (
    <div id="map-section" className="card map-card">
      <div className="map-header">
        <div className="map-title-group">
          <div className="card-title-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="title-icon-svg">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            </svg>
          </div>
          <h2>AQI Map (India)</h2>
        </div>
        <button className="info-btn" title="Showing real-time AQI predictions across India">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="info-icon">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
      </div>

      <div className="map-container-wrapper">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Modern, light map style
          />
          
          <MapController center={mapCenter} zoom={mapZoom} />

          {cities.map((city) => {
            const isSelected = selectedCity && selectedCity.city === city.city;
            const aqi = getAQIValue(city, isSelected);
            const { color, category } = getAQIMeta(aqi);

            return (
              <CircleMarker
                key={city.city}
                center={[city.latitude, city.longitude]}
                radius={isSelected ? 14 : 9}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: 0.85,
                  color: isSelected ? "#0f172a" : "#ffffff",
                  weight: isSelected ? 3 : 1.5
                }}
              >
                <Popup className="map-popup">
                  <div className="popup-content">
                    <h3>{city.city}</h3>
                    <p className="popup-state">{city.state}</p>
                    <div className="popup-aqi-row">
                      <span className="popup-aqi-val" style={{ color: color }}>
                        {aqi.toFixed(0)}
                      </span>
                      <span className="popup-aqi-lbl" style={{ backgroundColor: color + "1a", color: color }}>
                        {category}
                      </span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Floating map legend */}
        <div className="map-floating-legend">
          <div className="legend-item"><span className="dot good"></span> 0-50 Good</div>
          <div className="legend-item"><span className="dot moderate"></span> 51-100 Mod</div>
          <div className="legend-item"><span className="dot sensitive"></span> 101-150 Sens</div>
          <div className="legend-item"><span className="dot unhealthy"></span> 151+ Unhealth</div>
        </div>
      </div>
    </div>
  );
}

export default AQIMap;