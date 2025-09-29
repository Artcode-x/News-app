import { HeaderProps } from '../../interface/interface';
import * as S from './Header.styled';

function Header({ clickToMenu }: HeaderProps) {
  return (
    <S.Header>
      <S.MenuButton onClick={clickToMenu}>
        <S.MenuIcon />
      </S.MenuButton>
      <S.Title>BESIDER</S.Title>
    </S.Header>
  );
}

export default Header;
