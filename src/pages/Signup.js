import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Footer.scss";

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
      if (email === '' || password === ''|| confirmPassword === '') {
        alert('Please Input Email and Password to Proceed')
      } else if (firstName === "" || lastName === "" || address === "" || mobileNum === "") {
        alert("Please Fill the Blanks to Continue")
      } else if (password != confirmPassword) {
        alert("Password do not match")
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
              alert('Success! Please Login again to proceed');
              navigate('/Login');
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

  return (
    <>
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