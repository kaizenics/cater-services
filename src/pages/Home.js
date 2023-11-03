import { useEffect, useState } from 'react';
import { MdExpandMore } from "react-icons/md";
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import HomeItems from '../components/HomeItems';
import image from "../images/header-dish.png";
import "../styles/Home.scss";

export default function Home() {
  const [dish, setDish] = useState([]);

  useEffect(() => {
   fetch("http://localhost/serverside/items/getItem.php")
       .then((response) => response.json())
       .then((data) => setDish(data))
       .catch((error) => console.error("Error:", error));
  }, [])

  return (
    <>
      <HomeNav />

      <section className="home-container-1">
        <div className="home-img">
          <img src={image} alt="" />
        </div>

        <div className="home-search">
          <p>Savor every bite of your favorite flavors</p>
          <div className="search-sec">
            <div className="search-box">
              <div class="search-input">
                <input
                  type="text"
                  autoComplete="off"
                  id="text"
                  placeholder=""
                />
                <label for="">Search an available food that you like</label>
                <button className="search-btn">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="expand-items">
        <p>Available Dishes</p>
        <MdExpandMore className="md-icon"></MdExpandMore>
      </div>

      <section className="home-container-2">
        <HomeItems dishes={dish}/>
      </section>

      <Footer />
    </>
  );
}
