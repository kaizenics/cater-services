import React, { useEffect, useState } from 'react';
import HomeNav from '../components/HomeNav';
import '../styles/Cart.scss';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleDeleteItem = (index) => {
    const confirmation = window.confirm("Are you sure you want to remove this item?");
    if (!confirmation) {
      return;
    }

    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return (
    <>
      <HomeNav />

      <section className="cart-body">
        <div className="cart-container">
          <h1>Cart Items</h1>
          <div className="cart-box-container">
            {cartItems.map((item, index) => (
              <div key={index} className={`cart-box ${index % 2 === 0 ? 'even' : 'odd'}`}>
                <div className="cart-children">
                  <div className="cart-info">
                    <img src={item.imageUrl} className="cart-img" alt="" />
                    <div className="cart-desc">
                      <h1>{item.itemName}</h1>
                      <h2>{item.description}</h2>
                      <h4>Quantity: {item.quantity}</h4>
                      <h3>₱ {item.price}</h3>
                    </div>
                  </div>
                  <div className="cart-buttons">
                    <button className="cart-buy">Buy</button>
                    <button className="cart-delete" onClick={() => handleDeleteItem(index)}>Remove Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
