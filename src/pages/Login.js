import { useState } from "react";
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Auth.scss";

export default function Login() {
  const [clicked, setClicked] = useState(false);

  function handleLoginClick() {
    setClicked(true);
  }

  return (
    <>
      <Navbar />
      <section className="login-page">
        <div className="box-container">
          <div className="login-box">
            <h3>Welcome!</h3>
            <p>Please Login to continue</p>
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
            <button
              className={`login-btn ${clicked ? "clicked" : ""}`}
              onClick={handleLoginClick}
            >
              Login
            </button>
            <h5>
              Don't have an account?{" "}
              <Link to="/Signup" className="direct-auth">
                Get Started
              </Link>
            </h5>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
