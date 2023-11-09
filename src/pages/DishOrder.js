import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import "../styles/DishOrder.scss";
import { Link } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { useState, useEffect } from "react";

export default function DishOrder() {
  const [quantity, setQuantity] = useState(1);
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost/serverside/items/getItem.php")
      .then((response) => response.json())
      .then((data) => setDishes(shuffleArray(data)))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const storedDish = JSON.parse(localStorage.getItem('selectedDish'));
    setSelectedDish(storedDish);
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItemCount(storedCartItems.length);
  }, []);

  if (!selectedDish) {
    return <div>Loading...</div>;
  }

  function handleAddToCartClick() {
    const cartItem = {
      imageUrl: selectedDish.imageUrl,
      itemName: selectedDish.itemName,
      description: selectedDish.description,
      price: selectedDish.price,
      quantity: quantity,
    };
  
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartItemCount((prevCount) => prevCount + 1);
  
    alert('Item added to cart!');

    fetch("http://localhost/serverside/cart/addCartItems.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_id: window.localStorage.getItem('accountId'),
        imageUrl: cartItem.imageUrl,
        itemName: cartItem.itemName,
        description: cartItem.description,
        price: cartItem.price,
        quantity: cartItem.quantity,
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }

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

  function handleOrderClick(dish) {
    window.location.href = '/DishOrder';
    const selectedDish = {
      ...dish,
      imageUrl: `http://localhost/serverside/items/${dish.imageUrl}` 
    };
    localStorage.setItem('selectedDish', JSON.stringify(selectedDish));
    setSelectedDish(selectedDish);
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
              src={selectedDish.imageUrl}
              className="dish-icon-1"
              alt=""
            />
            <div className="dish-info-child">
              <h1>{selectedDish.itemName}</h1>
              <h2>{selectedDish.description}</h2>
              <p>
                <span>Price: </span>
                ₱ {selectedDish.price}
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
                  <button className="dish-btn-1" onClick={handleAddToCartClick}>Add to Cart</button>
                <Link to="/Cart">
                  <button className="dish-btn-1">Check Orders</button>
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
        {dishes.slice(0, 5).map((desh, key) => (
          <div key={key} className="dish-container">
            <div className="dish-box">
              <img
                src={`http://localhost/serverside/items/${desh.imageUrl}`}
                className="dish-img"
                alt={desh.itemName}
              />
              <div className="dish-desc">
                <h1>{desh.itemName}</h1>
                <p>₱ {desh.price}</p>
              </div>
              <p>{desh.description}</p>
              <Link to="/DishOrder">
                <button
                  className="dish-btn"
                  onClick={() => handleOrderClick(desh)}
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
