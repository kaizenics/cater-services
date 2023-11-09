import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import HomeNav from "../components/HomeNav";
import "../styles/Cart.scss";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const accountId = window.localStorage.getItem("accountId");

    fetch(
      `http://localhost/serverside/cart/getCartItems.php?account_id=${accountId}`
    )
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const updatedCartItemCount = cartItems.length;
  localStorage.setItem("cartItemCount", updatedCartItemCount);

  const handleDeleteItem = (cart_id) => {
    const confirmation = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (!confirmation) {
      return;
    }
    const accountId = window.localStorage.getItem("accountId");
    fetch(`http://localhost/serverside/cart/deleteCartItems.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account_id: accountId, item_id: cart_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.Message === "Item removed from cart") {
          const updatedCartItems = cartItems.filter(
            (item) => item.cart_id !== cart_id
          );
          setCartItems(updatedCartItems);
          
          const updatedCartItemCount = updatedCartItems.length;
          localStorage.setItem('cartItemCount', updatedCartItemCount);
        } else {
          alert("Error removing item from cart: " + data.Message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleBuy = (item) => {
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    selectedItems.push(item);
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  };

  return (
    <>
      <HomeNav />

      <section className="cart-body">
        <div className="cart-container">
          <div className="cart-info-above">
            <BsCart3 className="bs-cart" />
            <h1>Cart Items</h1>
            {cartItems.length >= 2 && (
              <button className="buy-all">Buy All</button>
            )}
          </div>
          <div className="cart-box-container">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className={`cart-box ${index % 2 === 0 ? "even" : "odd"}`}
              >
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
                    <Link to="/OrderPayment" onClick={() => handleBuy(item)}>
                      <button className="cart-buy">Buy</button>
                    </Link>
                    <button
                      className="cart-delete"
                      onClick={() => {
                        console.log(item.cart_id);
                        handleDeleteItem(item.cart_id);
                      }}
                    >
                      Remove Item
                    </button>
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
