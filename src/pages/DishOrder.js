import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import "../styles/DishOrder.scss";
import { Link, useLocation } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { useState, useEffect } from "react";

export default function DishOrder(props) {
  const location = useLocation();
  const dishInfo = location.state?.dishInfo;
  const [quantity, setQuantity] = useState(1);
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    fetch("http://localhost/serverside/items/getItem.php")
      .then((response) => response.json())
      .then((data) => setDishes(shuffleArray(data)))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (location.state && location.state.dishInfo) {
      setSelectedDish(location.state.dishInfo);
    }
  }, [location.state]);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <>
      <HomeNav />
      <section className="dish-order-body">
        <div className="dish-order-container">
          <div className="dish-info">
            <img
              src={`http://localhost/serverside/items/${selectedDish ? selectedDish.imageUrl : null}`}
              className="dish-icon-1"
              alt=""
            />
            <div className="dish-info-child">
              <h1>{selectedDish ? selectedDish.itemName : "Super Sisig"}</h1>
              <h2>
                {selectedDish
                  ? selectedDish.description
                  : "Filipino made style sisig dish"}
              </h2>
              <p>
                <span>Price: </span>
                {selectedDish ? selectedDish.price : "89"} PHP
              </p>
              <h3>Quantity:</h3>
              <div className="quantity-control">
                <div className="quantity-adding">
                  <button
                    className="quantity-btn-left"
                    onClick={handleDecrease}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="quantity-input"
                  />
                  <button
                    className="quantity-btn-right"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="dish-buttons">
                <Link to="/Home">
                  <button className="dish-btn-1">Add to Cart</button>
                </Link>
                <Link to="/Home">
                  <button className="dish-btn-1">Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="expand-items-1">
        <p>Dishes you may like</p>
        <MdExpandMore className="md-icon-1"></MdExpandMore>
      </div>

      <section className="dish-grid">
        {dishes.map((desh, key) => (
          <div key={key} className="dish-container">
            <div className="dish-box">
              <img
                src={`http://localhost/serverside/items/${desh.imageUrl}`}
                className="dish-img"
                alt={desh.itemName}
              />
              <div className="dish-desc">
                <h1>{desh.itemName}</h1>
                <p>{desh.price} PHP</p>
              </div>
              <p>{desh.description}</p>
              <Link to="/DishOrder">
                <button
                  className="dish-btn"
                  onClick={() => setSelectedDish(desh)}
                  
                >
                  Order now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}
