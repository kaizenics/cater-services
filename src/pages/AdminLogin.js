import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Auth.scss";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  async function AdminLoginHandler() {
    if (email === '' || password === '') {
      setError('Please Input Email and Password to Proceed');
      setEmailError(true);
      setPasswordError(true);
    } else if (email === '') {
      setEmailError(true);
      setPasswordError(false);
    } else if (password === '') {
      setPasswordError(true);
      setEmailError(false);
    } else {
      try {
        var headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        const url = 'http://localhost/serverside/auth/AdminLogin.php';
        var data = {
          Email2: email,
          Password2: password,
        };

        const res = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        });

        const response = await res.json();

        if (response.Message === 'Welcome!') {
            alert('Navigating to Admin Panel');
            navigate('/AdminPanel');

        } else if (response.Message === 'Incorrect Email') {
          alert('Incorrect Email');
          setEmailError(true);
          setPasswordError(false);
        } else if (response.Message === 'Incorrect Password') {
          alert('Incorrect Password');
          setEmailError(true);
          setPasswordError(false);
        } else {
          alert('Invalid or missing input data!');
          setError(response.Message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function handleLoginClick() {
    setClicked(true);
  }

  function handleLoginClick() {
    setClicked(true);
  }

  return (
    <>
      <Navbar />
      <section className="login-page">
        <div className="box-container-3">
          <div className="login-box">
            <h3>Administrative Login</h3>
            <p>Please Login to your Admin Account</p>
            <div className="form-group">
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
            <div className="form-group">
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
              AdminLoginHandler(email, password);
              }}
            >
              Login
            </button>  
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
