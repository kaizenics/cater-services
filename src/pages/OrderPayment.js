import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HomeNav from "../components/HomeNav";
import "../styles/OrderPayment.scss";
import { MdOutlinePayments } from "react-icons/md";

export default function OrderPayment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(items);

    const cart_id = items.length > 0 ? items[0].cart_id : null;
    if (cart_id) {
      fetch(`http://localhost/serverside/payment/getPaymentDetails.php?cart_id=${cart_id}`)
        .then((response) => response.json())
        .then((data) => {
          setTotalBill(data.totalbill || 0);
        })
        .catch((error) => console.error("Error fetching payment details:", error));
    }
  }, []);

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <>
      <HomeNav />

      <section className="order-receipt-body">
        <div className="order-receipt-container">
          <div className="order-info">
            <div className="order-info-receipt">
              <div className="order-info-up">
                <MdOutlinePayments className="outline-payment" />
                <h1>Payment</h1>
              </div>
              <div className="order-choices">
                <button className={`cash-delivery-btn ${selectedPaymentMethod === 'cash' ? 'selected' : ''}`}
            onClick={() => handleSelectPaymentMethod('cash')}>Cash on Delivery</button>
                <button className={`online-payment-btn ${selectedPaymentMethod === 'gcash' ? 'selected' : ''}`}
            onClick={() => handleSelectPaymentMethod('gcash')}>
                  GCash
                </button>
              </div>
              <div className="order-text-info">
                <h2>Pay by Cash on Delivery</h2>
                <p>
                  Simply pay the driver when he delivers the food in your
                  doorsteps
                </p>
              </div>
              <div className="finish-pay-ctn">
                <p>
                  By making this purchase you agree to our{" "}
                  <span>Terms and Conditions</span>
                </p>
                <Link to="/OrderReceipt">
                <button className="finish-pay">Finish and Pay</button>
                </Link>
                <p id="terms-and-condition"> Our policies and guidelines to ensure a fair and transparent interaction between users and our platform. By using our services, you agree to adhere to these terms, which outline your rights, responsibilities, and acceptable behavior. Please review them carefully for a seamless experience.</p>
              </div>
            </div>
            <div className="order-box">
              <h1>Your Order</h1>
              <div className="order-total-group">
                {selectedItems.map((item, index) => (
                <div 
                key={index}
                className="order-receipt-1">
                  <p>{item.quantity} × {item.itemName}</p>
                  <h1 id="p-span">PHP {item.price}</h1>
                </div>
                ))}
                <div className="orders-total">
                  <div className="order-sub-total">
                    <p>Subtotal</p>
                    <p>PHP {totalBill.toFixed(2)}</p>
                  </div>
                  <div className="order-del-fee">
                    <p>Delivery Fee</p>
                    <p>PHP 0.00</p>
                  </div>
                  <div className="order-all-total">
                    <h1>Total</h1>
                    <h1>PHP {totalBill.toFixed(2)}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
