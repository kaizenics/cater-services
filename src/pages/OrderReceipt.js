import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import "../styles/OrderReceipt.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function OrderReceipt() {
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("selectedItems")) || [];
    const cartId = items.length > 0 ? items[0].cart_id : null;

    if (cartId) {
      fetch(
        `http://localhost/serverside/orders/getOrderDetails.php?cart_id=${cartId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setOrderDetails(data);
        })
        .catch((error) =>
          console.error("Error fetching order details:", error)
        );
    }
  }, []);

  return (
    <>
      <HomeNav />

      <section className="order-receipt-body">
        <div className="order-receipt-container-1">
          <div className="order-receipt-text">
            <h1>Thank you for ordering!</h1>
            <p>This is your receipt/order details</p>
          </div>
          <div className="order-receipt-box">
            <div className="set-box">
              <div className="receipt-box">
                <h1>
                  Bill to:{" "}
                  <span>
                    {orderDetails.firstname} {orderDetails.lastname}
                  </span>
                </h1>
                <h1>
                  Invoice Number: <span>{orderDetails.invoiceNum}</span>
                </h1>
                <h1>
                  Location: <span>{orderDetails.address}</span>
                </h1>
                <h1>
                  Date Issued: <span>{orderDetails.addDate}</span>
                </h1>
                <h1>
                  Ordered Item:{" "}
                  {orderDetails.items && Array.isArray(orderDetails.items) ? (
                    <span>
                      {orderDetails.items
                        .map((item) => `${item.quantity} x ${item.itemName}`)
                        .join(", ")}
                    </span>
                  ) : (
                    <span>No items available</span>
                  )}
                </h1>
                <h1>
                  Payment Method: <span>{orderDetails.payment_method}</span>
                </h1>
                <h1>
                  Total Bill: <span>{orderDetails.totalbill} PHP</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="set-button">
            <Link to="/Home">
              <button className="back-btn">Back to Home</button>
            </Link>
            <Link to="/Profile">
              <button className="back-btn">Go to Profile</button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
