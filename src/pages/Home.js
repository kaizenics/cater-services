import { MdExpandMore } from "react-icons/md";
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import image from "../images/header-dish.png";
import dish from "../images/image-dish.png";
import "../styles/Home.scss";

export default function Home() {
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
        <div className="dish-container">
          <div className="dish-box">
            <img src={dish} className="dish-img" />
            <div className="dish-desc">
              <h1>Filipino Sisig</h1>
              <p>89 PHP</p>
            </div>
            <p>Filipino-Style Sisig Dish known for its savory and tangy flavors.</p>
            <button className="dish-btn">Order now</button>
          </div>
          <div className="dish-box">
            <img src={dish} className="dish-img" />
            <div className="dish-desc">
              <h1>Filipino Sisig</h1>
              <p>89 PHP</p>
            </div>
            <p>Filipino-Style Sisig Dish known for its savory and tangy flavors.</p>
            <button className="dish-btn">Order now</button>
          </div>
          <div className="dish-box">
            <img src={dish} className="dish-img" />
            <div className="dish-desc">
              <h1>Filipino Sisig</h1>
              <p>89 PHP</p>
            </div>
            <p>Filipino-Style Sisig Dish known for its savory and tangy flavors.</p>
            <button className="dish-btn">Order now</button>
          </div>
          <div className="dish-box">
            <img src={dish} className="dish-img" />
            <div className="dish-desc">
              <h1>Filipino Sisig</h1>
              <p>89 PHP</p>
            </div>
            <p>Filipino-Style Sisig Dish known for its savory and tangy flavors.</p>
            <button className="dish-btn">Order now</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
