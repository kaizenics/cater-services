import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Footer.scss";

export default function Signup() {
    const [clicked, setClicked] = useState(false);

  function handleLoginClick() {
    setClicked(true);
  }

  return (
    <>
      <Navbar />
      <section className="login-page">
        <div className="box-container-1">
          <div className="login-box">
            <h3>We are happy to serve you!</h3>
            <p>Please Sign up to continue</p>
            <div class="form-group">
              <input type="text" autoComplete="off" id="email" placeholder="" />
              <label for="email">Email</label>
            </div>
            <div class="form-group">
              <input
                type="password"
                autoComplete="off"
                id="password"
                placeholder=""
              />
              <label for="">Password</label>
            </div>
            <div class="form-group">
              <input
                type="password"
                autoComplete="off"
                id="password"
                placeholder=""
              />
              <label for="">Confirm Password</label>
            </div>
            <button
              className={`login-btn ${clicked ? "clicked" : ""}`}
              onClick={handleLoginClick}
            >
              Sign up
            </button>
            <h5>
              Already have an account?{" "}
              <Link to="/Signup" className="direct-auth">
                Login
              </Link>
            </h5>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
