import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeNav from "../components/HomeNav";
import { MdOutlinePayments } from "react-icons/md";
import "../styles/OrderPayment.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function OrderPayment() {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [specialNote, setSpecialNote] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(items);

    const cart_id = items.length > 0 ? items[0].cart_id : null;
    if (cart_id) {
      fetch(
        `http://localhost/serverside/payment/getPaymentDetails.php?cart_id=${cart_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTotalBill(data.totalbill || 0);
          setSelectedPaymentMethod(data.payment_method || null);
        })
        .catch((error) =>
          console.error("Error fetching payment details:", error)
        );
    }
  }, []);

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);

    const cartId = selectedItems.length > 0 ? selectedItems[0].cart_id : null;

    fetch("http://localhost/serverside/payment/updatePaymentMethod.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart_id: cartId,
        payment_method: method,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Payment method updated successfully");
        } else {
          console.error("Failed to update payment method:", data.error);
        }
      })
      .catch((error) => console.error("Error updating payment method:", error));
  };

  const getPaymentValue = () => {
    switch (selectedPaymentMethod) {
      case "GCash":
        return "GCash";
      case "Cash on Delivery":
        return "Cash on Delivery";
      default:
        return null;
    }
  };

  const handleFinishAndPay = async () => {
    const cartId = selectedItems.length > 0 ? selectedItems[0].cart_id : null;

    if (!selectedPaymentMethod) {
      toast.warn('Please select a payment method before finishing and paying.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
  
    if (cartId) {
      try {
        const response = await fetch(
          "http://localhost/serverside/orders/insertOrder.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart_id: cartId,
              note: specialNote,
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          console.log("Order completed successfully");

          const loadingToastId = toast.info('Processing your order...', {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
    
          setTimeout(() => {
            toast.dismiss(loadingToastId);
  
            toast.success('Your order is confirmed!', {
              position: "top-center",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
    
            setTimeout(() => {
              navigate('/OrderReceipt');
            }, 5000);
          }, 3500);

          const orderDetailsResponse = await fetch(
            `http://localhost/serverside/orders/getOrderDetails.php?cart_id=${cartId}`
          );
          const orderDetailsData = await orderDetailsResponse.json();

          const existingOrders =
            JSON.parse(localStorage.getItem("orders")) || [];
          const orderExists = existingOrders.some(
            (order) => order.invoiceNum === orderDetailsData.invoiceNum
          );

          if (!orderExists) {
            const updatedOrders = [...existingOrders, orderDetailsData];
            localStorage.setItem("orders", JSON.stringify(updatedOrders));
          }
        } else {
          console.error("Failed to complete order:", data.error);
        }
      } catch (error) {
        console.error("Error completing order:", error);
      }
    }
  };

  useEffect(() => {
    document.title = "Payment | Ate Gang's Catering Services";
  
    return () => {
      document.title = "Ate Gang's Catering Services";
    };
  }, []);

  return (
    <>
    <ToastContainer/>
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
                <button
                  className={`cash-delivery-btn ${
                    selectedPaymentMethod === "Cash on Delivery"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSelectPaymentMethod("Cash on Delivery")}
                >
                  Cash on Delivery
                </button>
                <button
                  className={`online-payment-btn ${
                    selectedPaymentMethod === "GCash" ? "selected" : ""
                  }`}
                  onClick={() => handleSelectPaymentMethod("GCash")}
                >
                  GCash
                </button>
              </div>
              {selectedPaymentMethod && (
                <div className="order-text-info">
                  <h2>Pay by {getPaymentValue()}</h2>
                  <p>Double check your payments and you are good to go!</p>
                </div>
              )}
              <div className="special-note-ctn">
                <h1>Special Note:</h1>
                <textarea 
                className="special-note"
                onChange={(e) => setSpecialNote(e.target.value)} />
              </div>
              <div className="finish-pay-ctn">
                <p>
                  By making this purchase you agree to our{" "}
                  <a href="/Terms">
                    <span>Terms and Conditions</span>
                  </a>
                </p>
                  <button className="finish-pay" onClick={handleFinishAndPay}>
                    Finish and Pay
                  </button>
                <p id="terms-and-condition">
                  Our policies and guidelines ensure a fair and transparent
                  interaction between users and our platform. By using our
                  services, you agree to adhere to these terms, which outline
                  your rights, responsibilities, and acceptable behavior. Please
                  review them carefully for a seamless experience.
                </p>
              </div>
            </div>
            <div className="order-box">
              <h1>Your Order</h1>
              <div className="order-total-group">
                {selectedItems.map((item, index) => (
                  <div key={index} className="order-receipt-1">
                    <p>
                      {item.quantity} × {item.itemName}
                    </p>
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
