import * as S from './Footer.styled';

function Footer() {
  return (
    <S.Footer>
      <S.Nav>
        <S.Link>Log In</S.Link>
        <S.Link>About Us</S.Link>
        <S.Link>Publishers</S.Link>
        <S.Link>Sitemap</S.Link>
      </S.Nav>
      <S.Powered>
        <S.Api>Powered by</S.Api>
        <S.Logo
          width={138}
          height={82}
          src='/assets/news-api.png'
          alt='News API logo'
        />
      </S.Powered>
      <S.Copyright>© 2023 Besider. Inspired by Insider</S.Copyright>
    </S.Footer>
  );
}

export default Footer;
