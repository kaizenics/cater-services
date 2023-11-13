import AdminSidebar from '../components/AdminSidebar'
import { useNavigate } from 'react-router-dom';
import { BsGear } from 'react-icons/bs'
import '../styles/Settings.scss'

export default function Settings() {
    const navigate = useNavigate();

    const logout = () => {
        const confirmation = window.confirm("Are you sure you want to log out?");
        if (!confirmation) {
          return;
        } else {
          localStorage.removeItem("firstname");
          localStorage.removeItem("cartItems");
          localStorage.removeItem('cartItemCount');
          navigate("/");
        }
      };
    return (
        <>
        <div className="settings-ctn">
        <AdminSidebar/>
         <section className="settings-body">
            <div className="settings-container">
                <div className="settings-text">
                    <BsGear className="setting-gear"/>
                    <h1>Settings</h1>
                </div>
            </div>
            <div className="admin-setting-ctn">
                <button className="admin-logout" onClick={logout}>Log out</button>
            </div>
         </section>
         </div>
        </>
    )
}