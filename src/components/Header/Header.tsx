import "./Header.css";

type HeaderProps = {
  clickToMenu: () => void;
};

function Header({ clickToMenu }: HeaderProps) {
  return (
    <header className="header">
      <button className="header__menu" onClick={clickToMenu}>
        <span className="header__menu-icon" />
      </button>
      <h1 className="header__title">BESIDER</h1>
    </header>
  );
}

export default Header;
