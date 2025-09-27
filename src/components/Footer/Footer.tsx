import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <nav className='footer__nav'>
        <a className='footer__link'>Log In</a>
        <a className='footer__link'>About Us</a>
        <a className='footer__link'>Publishers</a>
        <a className='footer__link'>Sitemap</a>
      </nav>
      <div className='footer__powered'>
        <a className='footer__api'> Powered by </a>
        <img
          width={138}
          height={82}
          src='/assets/news-api.png'
          alt='News API logo'
          className='footer__logo'
        />
      </div>
      <div className='footer__copyright'>
        © 2023 Besider. Inspired by Insider
      </div>
    </footer>
  );
}

export default Footer;
