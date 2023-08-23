import { Link } from 'react-router-dom'
import '../styles/Navbar.scss'
import icon from '../images/restaurant.png'

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="image">
                    <Link to="/">
                        <img src={icon} alt="icon"/>
                    </Link>
                </div>
             <div className="navbar-nav">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/Login">Login</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/Signup">Signup</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/About">About</Link>
                    </li>
                </ul>
                    <button className="connect-btn">
                        <Link to="/Signup" className="btn">Get Started</Link>
                        </button>
                </div>
            </nav>
        </>
    )
}