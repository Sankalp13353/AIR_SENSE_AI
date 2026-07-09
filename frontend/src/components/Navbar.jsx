import "../styles/navbar.css";

function Navbar() {
  return (
    <header className="app-header">
      <div className="header-logo">
        <svg className="header-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <h1>AirSense AI</h1>
      </div>
    </header>
  );
}

export default Navbar;