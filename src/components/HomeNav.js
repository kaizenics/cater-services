import { Link } from 'react-router-dom'
import { FaRegUser, FaShoppingBag } from "react-icons/fa";
import '../styles/HomeNav.scss'
import icon from '../images/ate-gangs.png'

export default function HomeNavbar() {

    return (
        <>
            <nav className="home-navbar">
                <div className="home-image">
                    <Link to="/">
                        <img src={icon} alt="icon"/>
                    </Link>
                </div>
             <div className="home-navbar-nav">
                <div className="home-navbar-list">
                    <Link to="/Home" className="home-navbar-item">
                        <FaRegUser className="fa-icon"></FaRegUser>
                        <h4>{localStorage.getItem('firstname')}</h4>
                        </Link>
                </div>
                 <Link to="/Login">
                   <FaShoppingBag className="fa-icon-1"/>
                   </Link>
                </div>
            </nav>
        </>
    )
}