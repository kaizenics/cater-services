import { useEffect, useState } from 'react'
import AdminSidebar from "../components/AdminSidebar";
import MenuItems from "../components/MenuItems";
import { BiDish, BiDollarCircle, BiUser } from "react-icons/bi";
import "../styles/AdminPanel.scss";

export default function Admin() {
 const [menu, setMenu] = useState([]);
 const [totalOrderedDishes, setTotalOrderedDishes] = useState(0);
 const [totalRevenue, setTotalRevenue] = useState(0);
 const [totalUsers, setTotalUsers] = useState(0);

 useEffect(() => {
  // Fetch Total Ordered Dishes
  fetch("http://localhost/serverside/admin/totalDishes.php")
    .then((response) => response.json())
    .then((data) => setTotalOrderedDishes(data.totalOrderedDishes))
    .catch((error) => console.error("Error:", error));

  // Fetch Total Revenue
  fetch("http://localhost/serverside/admin/totalRevenue.php")
    .then((response) => response.json())
    .then((data) => setTotalRevenue(data.totalRevenue))
    .catch((error) => console.error("Error:", error));

  // Fetch Total Users
  fetch("http://localhost/serverside/admin/totalUsers.php")
    .then((response) => response.json())
    .then((data) => setTotalUsers(data.totalUsers))
    .catch((error) => console.error("Error:", error));
}, []);

 useEffect(() => {
  fetch("http://localhost/serverside/items/getItem.php")
      .then((response) => response.json())
      .then((data) => setMenu(data))
      .catch((error) => console.error("Error:", error));
 }, [])

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
                  <h1>{totalOrderedDishes}</h1>
                </div>
              </div>
              <div className="stats-box">
                <h2>Total Revenue</h2>
                <div className="stats-desc-1">
                  <BiDollarCircle className="dish-icon"></BiDollarCircle>
                  <h1>{totalRevenue}</h1>
                </div>
              </div>
              <div className="stats-box">
                <h2>Total Users</h2>
                <div className="stats-desc-1">
                  <BiUser className="dish-icon"></BiUser>
                  <h1>{totalUsers}</h1>
                </div>
              </div>
            </div>
          </section>

          <section className="crud-dishes">
            <MenuItems menu={menu}/>
          </section>
        </div>
      </div>
    </>
  );
}
