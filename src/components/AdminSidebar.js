import { Link } from 'react-router-dom';
import { BsHouseDoor, BsGear } from 'react-icons/bs';
import { RiAdminLine } from 'react-icons/ri';
import icon from '../images/ate-gangs.png'
import '../styles/AdminSidebar.scss';

export default function SideNavbar() {
  return (
    <div className="sidebar-container">
     <nav className="side-navbar">
      <div className="home-title">
        <img src={icon} className="side-icon" alt="Icon" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/AdminPanel">
            <BsHouseDoor className="sidebar-icon" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/UserMgt">
            <RiAdminLine className="sidebar-icon" />
            User Management
          </Link>
        </li>
        <li>
          <Link to="/Settings">
            <BsGear className="sidebar-icon" />
            Settings
          </Link>
        </li>
      </ul>
    </nav>
    </div>
  );
}
