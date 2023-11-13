import { Link } from 'react-router-dom';
import '../styles/Footer.scss';

export default function Footer() {
    return(
        <>
         <div className="end-1">
            <div></div>
          </div>

          <div className="down-text">
             <h1>Ate Gangs Catering Services, 1946 Quezon Street, Sto. Nino, Panabo City - ategang.cater@gmail.com</h1>
          </div>

         <section className="footer-container">
         <div className="column">
                    <h4>Resources</h4>
                    <Link to="/FAQ" className="column-hover">
                        <p>Help</p>
                    </Link>
                    <Link to="/" className="column-hover">
                        <p>Privacy</p>
                    </Link>
                </div>
                <div className="column">
                    <h4>Socials</h4>
                    <a href="https://facebook.com/kaizernics/" target="_blank" className="column-hover">
                        <p>Facebook</p>
                    </a>
                    <a href="https://instagram.com/kaizenics/" target="_blank" className="column-hover">
                        <p>Instagram</p>
                    </a>
                    <a href="https://github.com/kaizenics/" target="_blank" className="column-hover">
                        <p>GitHub</p>
                    </a>
                </div>
                <div className="column">
                    <h4>Support</h4>
                    <Link to="/FAQ" className="column-hover">
                        <p>FAQ</p>
                    </Link>
                    <Link to="/" className="column-hover">
                        <p>Updates</p>
                    </Link>
                </div>
                <div className="column">
                    <h4>Open Source</h4>
                    <Link to="/" className="column-hover">
                        <p>Contribute</p>
                    </Link>
                    <Link to="/" className="column-hover">
                        <p>Report a bug</p>
                    </Link>
                    <Link to="/" className="column-hover">
                        <p>Request a feature</p>
                    </Link>
                </div>
         </section>
         <div className="down-text">
                <p>Heraeus Interactive © 2023</p>
                </div>
        </>
    )
}