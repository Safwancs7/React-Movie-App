// src/components/Header.jsx
function Header() {
  return (
    <header className="app-header">
      <div className="app-header__content">
        <div className="app-logo">
          <span className="app-logo__icon">🎬</span>
          <div>
            <h1 className="app-logo__title">Movie Library</h1>
            <p className="app-logo__subtitle">
              Search and explore titles from OMDb
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
