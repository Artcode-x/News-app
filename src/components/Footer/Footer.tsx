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
        Powered by <span className='footer__api'>News API</span>
      </div>
      <div className='footer__copyright'>
        © 2023 Besider. Inspired by Insider
      </div>
    </footer>
  );
}

export default Footer;
