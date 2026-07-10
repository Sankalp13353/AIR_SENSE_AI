import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapTheme, setMapTheme] = useState("light");

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

  // Generate glowing pulsing Leaflet divIcon markers
  const createAQIIcon = (color, isSelected, category) => {
    return L.divIcon({
      className: `custom-aqi-marker-container ${isSelected ? "selected" : ""}`,
      html: `
        <div class="aqi-pulse-dot" style="background-color: ${color};">
          <span class="aqi-pulse-ring" style="color: ${color};"></span>
        </div>
      `,
      iconSize: isSelected ? [32, 32] : [24, 24],
      iconAnchor: isSelected ? [16, 16] : [12, 12]
    });
  };

  const renderMap = (isLarge = false) => {
    const tileUrl =
      mapTheme === "light"
        ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    return (
      <div className="map-container-wrapper">
        <MapContainer
          key={`${mapTheme}-${isLarge}`} // Ensure fresh Leaflet instance on theme/layout changes
          center={mapCenter}
          zoom={isLarge ? mapZoom + 1 : mapZoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={tileUrl}
          />
          
          <MapController center={mapCenter} zoom={isLarge ? mapZoom + 1 : mapZoom} />

          {cities.map((city) => {
            const isSelected = selectedCity && selectedCity.city === city.city;
            const aqi = getAQIValue(city, isSelected);
            const { color, category } = getAQIMeta(aqi);
            const customIcon = createAQIIcon(color, isSelected, category);

            return (
              <Marker
                key={city.city}
                position={[city.latitude, city.longitude]}
                icon={customIcon}
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
              </Marker>
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
    );
  };

  return (
    <>
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              className="info-btn"
              onClick={() => setMapTheme(mapTheme === "light" ? "dark" : "light")}
              title={`Switch to ${mapTheme === "light" ? "Dark Map" : "Light Map"}`}
            >
              {mapTheme === "light" ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="info-icon">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="info-icon">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
            <button className="info-btn" onClick={() => setIsFullscreen(true)} title="Expand Map">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="info-icon">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            </button>
            <button className="info-btn" title="Showing real-time AQI predictions across India">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="info-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </button>
          </div>
        </div>

        {renderMap(false)}
      </div>

      {isFullscreen && (
        <div className="map-fullscreen-modal">
          <div className="map-fullscreen-content">
            <div className="map-fullscreen-header">
              <div className="map-title-group">
                <div className="card-title-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="title-icon-svg">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  </svg>
                </div>
                <h2>AQI Map (India) - Fullscreen</h2>
              </div>
              <button className="close-fullscreen-btn" onClick={() => setIsFullscreen(false)} title="Close Fullscreen">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px" }}>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="map-fullscreen-container">
              {renderMap(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AQIMap;