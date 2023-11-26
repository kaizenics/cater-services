import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Auth.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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

          const loadingToastId = toast.info('Logging in...', {
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
  
            toast.success('Logged in successfully!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
    
            setTimeout(() => {
              navigate('/Home');
            }, 5500);
          }, 3500);

          localStorage.setItem('cartItemCount', cartItems.length);
          
        } else if (response.Message === 'Incorrect Email') {
          setEmailError(true);
          setPasswordError(false);

          toast.error('Email address is Incorrect!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            
        } else if (response.Message === 'Incorrect Password') {
          setEmailError(true);
          setPasswordError(false);

          toast.error('Password is Incorrect!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        } else {
          setError(response.Message);
          toast.error('Invalid or missing input data', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    document.title = "Login | Ate Gang's Catering Services";

    return () => {
      document.title = "Ate Gang's Catering Services";
    };
  }, []);

  function handleLoginClick() {
    setClicked(true);
  }

  function handleLoginClick() {
    setClicked(true);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleLoginClick();
      LoginHandler(email, password);
    }
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
              onKeyDown={handleKeyPress}
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
                onKeyDown={handleKeyPress}
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
            <ToastContainer/>
        <h5>
              <Link to="/AdminLogin" className="admin-login-btn">
              Admin Login
              </Link>
            </h5>
            <h5>
              Don't have an account?{" "}
              <a href="/Signup" className="direct-auth">Get Started</a>
            </h5>
            
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
