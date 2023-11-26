import { useEffect, useState, useRef } from 'react';
import { MdExpandMore } from "react-icons/md";
import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import HomeItems from '../components/HomeItems';
import image from "../images/header-dish.png";
import "../styles/Home.scss";

export default function Home() {
  const [dish, setDish] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const expandItemsRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost/serverside/items/getItem.php")
      .then((response) => response.json())
      .then((data) => {
        setDish(data);
        document.title = searched ? "Searched Dishes | Ate Gang's Catering Services" : "Home | Ate Gang's Catering Services";
      })
      .catch((error) => console.error("Error:", error));

    return () => {
      document.title = "Ate Gang's Catering Services";
    };
  }, [searched]); 

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search query");
      return;
    }

    const filteredDishes = dish.filter(
      (item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDish(filteredDishes);
    setSearched(true);
    if (expandItemsRef.current && searched) {
      expandItemsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <label for="">Search an available food that you like</label>
                <button className="search-btn" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="expand-items" ref={expandItemsRef}>
        <p>{searched ? "Searched Dishes" : "Available Dishes"}</p>
        <MdExpandMore className="md-icon"></MdExpandMore>
      </div>

      <section className="home-container-2">
        <HomeItems dishes={dish}/>
      </section>

      <Footer />
    </>
  );
}
