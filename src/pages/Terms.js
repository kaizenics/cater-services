
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
                <p>All prices are listed in Philippine Peso (PHP) and are subject to change without notice. Payment for orders must be made in advance, and the Ordering System accepts various payment methods, including credit cards and online payment services.</p>
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


export default Terms;
