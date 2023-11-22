import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/CustomerCare.scss";
import React from "react";
import contact from "../images/contacts.png"; // Update the path to the correct location of the image
import facebook from "../images/facebook.png"; // Update the path to the correct location of the image
import instagram from "../images/instagram.png"; // Update the path to the correct location of the image
import phone from "../images/phone.png"; // Update the path to the correct location of the image

const CustomerCare = () => {
    return (
        <div>
            <Navbar />

            <section className="contact">
    <div className="image">
        <div className="overlay">
            <img src={contact} alt="My Photo" />
            <h1>Customer Care</h1>
        </div>
    </div>
    
</section>

<section className="boxes">
    <div className="box">
        <h3>Social Media</h3>
        <div className="logo-box">
            <div className="logo-item">
                <img src={facebook} alt=" FB LOGO"style={{ width: "50px", height: "50px" }} />
                <p>Ate Gangs Catering</p>
            </div>
            <div className="logo-item">
                <img src={instagram} alt="IG LOGO" style={{ width: "50px", height: "50px" }} />
                <p>@AteGangsC</p>
            </div>

            
        </div>
    </div>
    <div className="box">
    <div className="logo-box">
    <div className="logo-item">
    <h3>Contact Number</h3>  
                <img src={phone} alt="phone logo" style={{ width: "50px", height: "50px" }} />
                <p>0991-304-8785</p>
              
            </div>
        </div>
    </div>


</section>

<div className="form-container">
    <div className="text-container">
        <h1>Contact Us</h1>
        <p>Need to get in touch with us? Either fill out the form with your inquiry or find the department email you’d like to contact below.</p>
    </div>


<div className="box-form">
    <form>
        <label>
            First Name:
            <input type="text" name="firstName" className="input-field" />
        </label>
        <label>
            Last Name:
            <input type="text" name="lastName" className="input-field" />
        </label>
        <label>
            Email:
            <input type="email" name="email" className="input-field" />
        </label>
        <label>
            What can we help you with?
            <textarea name="help" className="input-field" />
        </label>
        <input type="submit" value="Submit" className="submit-button" />
    </form>
</div>
</div>

<Footer />

</div>

    );
};

export default CustomerCare;