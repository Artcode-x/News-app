import { HeaderProps } from '../../interface/interface';
import './Header.css';

function Header({ clickToMenu }: HeaderProps) {
  return (
    <header className='header'>
      <button className='header__menu' onClick={clickToMenu}>
        <span className='header__menu-icon' />
      </button>
      <h1 className='header__title'>BESIDER</h1>
    </header>
  );
}

export default Header;
