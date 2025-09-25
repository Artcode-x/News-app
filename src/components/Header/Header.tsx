import "./Header.css";

function Header() {
  return (
    <header className="header">
      <button
        className="header__menu"
        aria-label="Open menu"
      >
        <span className="header__menu-icon" />
      </button>
      <h1 className="header__title">BESIDER</h1>
    </header>
  );
}

export default Header