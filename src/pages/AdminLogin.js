import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Auth.scss";
import { ToastContainer, toast } from 'react-toastify';

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
  
            toast.success('Navigating to Admin Panel', {
              position: "top-center",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
    
            setTimeout(() => {
              navigate('/AdminPanel');
            }, 4500);
          }, 3000);

        } else if (response.Message === 'Incorrect Email') {
          setEmailError(true);
          setPasswordError(false);
          toast.warn('Email address is Incorrect', {
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
          toast.warn('Passsword is Incorrect', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
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
            pauseOnHover: true,
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

  function handleLoginClick() {
    setClicked(true);
  }

  function handleLoginClick() {
    setClicked(true);
  }

  useEffect(() => {
    document.title = "Login | Ate Gang's Catering Services";
  
    return () => {
      document.title = "Ate Gang's Catering Services";
    };
  }, []);

  return (
    <>
    <ToastContainer/>
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
