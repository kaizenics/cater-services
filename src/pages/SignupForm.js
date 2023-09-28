import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Footer.scss";

export default function Signup() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [mobileNum, setMobileNum] = useState();
    const [error, setError] = useState();
    const [clicked, setClicked] = useState(false);

    async function SignUpFormHandler() {
      if (firstName === '' || lastName === ''|| address === '' || mobileNum === '') {
        alert('Please Input Credentials to Proceed')
      } else {
        try {
          var headers = {
            Accept: 'application/json',
            'COntent-Type': 'application.json'
          };
          
          const url = "http://localhost/serverside/auth/AuthSignupForm.php";
          var data = {
            id: userId,
            firstName: firstName,
            lastName: lastName,
            address: address,
            mobileNum: mobileNum,
          }
          console.log(data)
          const res = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
          }).then(response => response.json())
          .then(response => {
            console.log(response);
            if (response[0].Message === "Successfully Registered!") {
              alert('Successfully Signed up! You will be redirected to Login Page');
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
        <div className="box-container-2">
          <div className="login-box">
            <h3>Let us know you more</h3>
            <p>Please fill the blanks to continue</p>
            <div class="form-group">
              <input 
              type="text" 
              autoComplete="off" 
              id="email" 
              placeholder="" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              />
              <label for="email">First name</label>
            </div>
            <div class="form-group">
              <input
                type="text"
                autoComplete="off"
                id="password"
                placeholder=""
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label for="">Last name</label>
            </div>
            <div class="form-group">
              <input
                type="text"
                autoComplete="off"
                id="password"
                placeholder=""
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label for="">Address</label>
            </div>
            <div class="form-group">
              <input
                type="text"
                autoComplete="off"
                id="password"
                placeholder=""
                value={mobileNum}
                onChange={(e) => setMobileNum(e.target.value)}
              />
              <label for="">Mobile number</label>
            </div>
            <button
              className={`login-btn ${clicked ? "clicked" : ""}`}
              onClick={() => {
                handleLoginClick();
                SignUpFormHandler();
              }}
            >
              Finish
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
