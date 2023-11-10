import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import "../styles/OrderReceipt.scss";
import { Link } from 'react-router-dom'

export default function OrderReceipt() {
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
                <h1>Bill to: <span>Niko Soriano</span></h1>
                <h1>Invoice Number: <span>4508</span></h1>
                <h1>Location: <span>Purok Chico, Barangay Sto. Nino, Panabo City</span></h1>
                <h1>Date Issued: <span>11/11/2023</span></h1>
                <h1>Ordered Item: <span>1 x Bicol Express, 4 x Lechon Baboy</span></h1>
                <h1>Payment Method: <span>GCash</span></h1>
                <h1>Total Bill: <span>450 PHP</span></h1>
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
