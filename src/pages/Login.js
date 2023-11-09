import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Auth.scss";

export default function Login() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  async function LoginHandler() {
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

        const url = 'http://localhost/serverside/auth/AuthLogin.php';
        var data = {
          Email: email,
          Password: password,
        };

        const res = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        });

        const response = await res.json();

        if (response.Message === 'Welcome!') {
          window.localStorage.setItem('firstname', response.firstNameId);
          window.localStorage.setItem('accountId', response.UserId);

          if (response.Role === 'admin') {
            alert('Navigating to Admin Panel');
            navigate('/AdminPanel');
          } else {
            alert('You have been Logged in!');
            navigate('/Home');
          }

          const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          const accountId = response.UserId;

          if (cartItems.length > 0) {
            const url = 'http://localhost/serverside/cart/addCartItems.php';
            await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                account_id: accountId,
                cart_items: cartItems,
              }),
            });
          }
          
          localStorage.setItem('cartItemCount', cartItems.length);

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
        <div className="box-container">
          <div className="login-box">
            <h3>Welcome!</h3>
            <p>Please Login to continue</p>
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
