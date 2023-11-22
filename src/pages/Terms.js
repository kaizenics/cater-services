
<<<<<<< Updated upstream
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/Terms.scss'
import { Link } from 'react-router-dom'


function Terms() {

  return (
    <>
      <Navbar />
      
      <section>
        <div className="terms-container">
          <div className="terms-box">
            <h1>Terms and Conditions</h1>
                <h2>1. Use of the Ordering System:</h2>
                <p>By using this ordering system, you agree to be bound by the terms and conditions set forth in this agreement. You are responsible for ensuring that your use of the system complies with all applicable laws and regulations.</p>
                <h2>2. Access to the Ordering System:</h2>
                <p>Access to the ordering system is provided to registered users only. Ate Gang's Catering Services reserves the right to deny access to the system to any user at any time without notice.</p>
                <h2>3. Account Registration:</h2>
                <p>To use the ordering system, you must register and create an account. You are solely responsible for maintaining the confidentiality and security of your account information. You agree to notify Ate Gang's Catering Services immediately of any unauthorized use of your account or any other breach of security.</p>
                <h2>4. Ordering Process:</h2>
                <p>The Ordering System allows you to place orders for food products offered by Ate Gang's Catering Services. By placing an order, you agree to pay for the products ordered. All orders are subject to acceptance by Ate Gang's Catering Services, and the company reserves the right to reject any order in its sole discretion.</p>
                <h2>5. Payment and Pricing:</h2>
                <p>All prices are listed in Philippine Peso (PHP) and are subject to change without notice. Payment for orders must be made in advance, and the Ordering System accepts various payment methods, including Cash on Delivery and Gcash Online Payment services.</p>
                <h2>6. Delivery:</h2>
                <p>Delivery of food products is subject to the terms and conditions of Ate Gang's Catering Services' delivery policy. Ate Gang's Catering Services shall not be liable for any delay or failure to deliver the products ordered due to unforeseen circumstances, including but not limited to traffic, weather conditions, and other events beyond its control.</p>
                <h2>7. Intellectual Property:</h2>
                <p>The Ordering System and all content, including but not limited to text, graphics, images, and software, are the property of Ate Gang's Catering Services</p>
           </div>
        </div>
      </section>


      <Footer />
    </>
  );
}

=======
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Terms.scss";

const Terms = () => {
    return (
        <div>
            <Navbar />


            <section> 
    <div className="terms">
     <h1>TERMS AND CONDITION</h1>
             <p>Please read these terms and conditions carefully before using the ordering system for Ate Gang's Catering Services. By using the ordering system, you agree to be bound by these terms and conditions:</p>
         
         <h2>1. Use of the Ordering System: </h2>
             <p>The ordering system is provided solely for the purpose of placing orders with Ate Gang's Catering Services. You may not use the system for any other purpose.</p>
    
        <h2>2. Accuracy of Information:</h2>
            <p>You are responsible for ensuring that the information you provide in the ordering system is accurate and complete. Ate Gang's Catering Services is not responsible for any errors or omissions in the information you provide.</p>
 
        <h2>3. Payment:</h2>
            <p>Payment for orders placed through the ordering system must be made at the time of ordering. Ate Gang's Catering Services reserves the right to refuse any order that is not paid for in full.</p>
        
        <h2>4. Cancellation and Refunds: </h2>
            <p>Orders placed through the ordering system may be cancelled or refunded in accordance with Ate Gang's Catering Services' cancellation and refund policy.  </p>
        
        <h2>5. Availability of Products:</h2>
            <p>Ate Gang's Catering Services reserves the right to change the availability of its products at any time and without notice.</p>
          
            <div className="d-terms">
            <p>By using the ordering system, you acknowledge that you have read and understood these terms and conditions and agree to be bound by them.</p>
            </div>
    
    </div>
    </section>
            <Footer />
        </div>
        
    );
};
>>>>>>> Stashed changes

export default Terms;
