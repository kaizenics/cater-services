import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Auth.scss";

export default function Login() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  async function LoginHandler() {
    if (email === '' || password === '') {
      setError('Please Input Email and Password to Proceed')
    } else {
      try {
        var headers = {
          Accept: 'application/json',
          'Content-Type' :'application.json'
        };

        const url = "http://localhost/serverside/auth/AuthLogin.php";
        var data = {
          Email: email,
          Password: password
        }
        console.log(data);
        const res = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data)
        }).then(response => response.json())
         .then(response => {
          console.log(response);
          if (response.Message === 'Welcome!') {
            alert("You have been Logged In!");
            navigate('/Home');
          } else {
            setError(response.Message);
          }
         }).catch(error => {
           console.log(error)
         })
      } catch (err) {
        console.log(err);
      }

      }
    }

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
              <input 
              type="text" 
              autoComplete="off" 
              id="email" 
              placeholder="" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              <label for="email">Email</label>
            </div>
            <div class="form-group">
              <input
                type="password"
                autoComplete="off"
                id="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="">Password</label>
            </div>
            <button
              className={`login-btn ${clicked ? "clicked" : ""}`}
              onClick={() => {
              handleLoginClick();
              LoginHandler(email, password);
              }}
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
