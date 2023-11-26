import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Footer.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Signup() {
  
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [mobileNum, setMobileNum] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [error, setError] = useState();
    const [clicked, setClicked] = useState(false);
    
    async function SignUpHandler() {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        toast.warn('Please enter a valid email address', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else if (password.length < 6) {
        toast.warn('Password must be at least 6 characters long', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else if (password !== confirmPassword) {
        toast.warn('Password do not match', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else if (firstName === '' || lastName === '' || address === '' || mobileNum === '') {
        toast.error('Please fill in all the fields', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else if (mobileNum ==! 11) {
        toast.warn('Mobile number must be 11 digits long', {
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
        try {
          var headers = {
            Accept: 'application/json',
            'COntent-Type': 'application.json'
          };
          
          const url = "http://localhost/serverside/auth/AuthSignup.php";
          var data = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            address: address,
            mobileNum: mobileNum,
          }
          console.log(data)
          const res = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
          }).then(response => response.json())
          .then(response => {
            console.log(response);
            if (response[0].Message === "Successfully Registered!") {
              toast.promise(
                new Promise((resolve) => {
                  toast.success('Successfully Signed up. Proceeding to Login page', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                  });
        
                  setTimeout(() => {
                    resolve();
                    navigate('/Login');
                  }, 3500);
                }),
              ); 
              
              
            } else {
              setError(response[0].Message);

            }
          }).catch(error => {
            console.log(error)
          })
        } catch (err) {
          console.log(err)
        }
      }
    }

  function handleLoginClick() {
    setClicked(true);
  }

  useEffect(() => {
    document.title = "Sign Up | Ate Gang's Catering Services";
  
    return () => {
      document.title = "Ate Gang's Catering Services";
    };
  }, []);

  return (
    <>
    <ToastContainer/>
      <Navbar />
      <section className="login-page">
        <div className="box-container-1">
          <div className="login-box">
            <h3>We are happy to serve you!</h3>
            <p>Please Sign up to continue</p>
            <div class="form-group">
              <input 
              type="text" 
              autoComplete="off" 
              id="email" 
              placeholder="" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              />
              <label for="firstName">First Name</label>
            </div>
            <div class="form-group">
              <input 
              type="text" 
              autoComplete="off" 
              id="email" 
              placeholder="" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              />
              <label for="lastName">Last Name</label>
            </div>
            <div class="form-group">
              <input 
              type="text" 
              autoComplete="off" 
              id="email" 
              placeholder="" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              />
              <label for="address">Address</label>
            </div>
            <div class="form-group">
              <input 
              type="text" 
              autoComplete="off" 
              id="email" 
              placeholder="" 
              value={mobileNum}
              onChange={(e) => setMobileNum(e.target.value)}
              />
              <label for="mobileNum">Mobile Number</label>
            </div>
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
            <div class="form-group">
              <input
                type="password"
                autoComplete="off"
                id="password"
                placeholder=""
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label for="">Confirm Password</label>
            </div>
            <button
              className={`login-btn ${clicked ? "clicked" : ""}`}
              onClick={() => {
                handleLoginClick();
                SignUpHandler(email, password);
              }}
            >
              Sign up
            </button>
            <h5>
              Already have an account?{" "}
              <a href="/Login" className="direct-auth">Login</a>
            </h5>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}