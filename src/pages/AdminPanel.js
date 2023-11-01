import AdminSidebar from "../components/AdminSidebar";
import MenuItems from '../components/MenuItems';
import { BiDish, BiDollarCircle, BiUser } from "react-icons/bi";
import "../styles/AdminPanel.scss";

export default function Admin() {
  return (
    <>
      <div className="dashboard-container">
        <AdminSidebar />
        <div className="dashboard-page">
          <section className="menu-stats-container">
            <div className="stats-container">
              <div className="stats-box">
                <h2>Total Ordered Dishes</h2>
                <div className="stats-desc-1">
                  <BiDish className="dish-icon"></BiDish>
                  <h1>1,117</h1>
                </div>
              </div>
              <div className="stats-box">
                <h2>Total Revenue</h2>
                <div className="stats-desc-1">
                  <BiDollarCircle className="dish-icon"></BiDollarCircle>
                  <h1>100,000</h1>
                </div>
              </div>
              <div className="stats-box">
                <h2>Total Users</h2>
                <div className="stats-desc-1">
                  <BiUser className="dish-icon"></BiUser>
                  <h1>124</h1>
                </div>
              </div>
            </div>
          </section>

          <section className="crud-dishes">
          <div className="crud-opt">
              <h2>Menu Items</h2>
              <table className="crud-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <MenuItems />
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
