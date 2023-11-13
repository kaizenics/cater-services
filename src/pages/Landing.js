import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import image from "../images/cater1.png";
import img2 from "../images/catering-buffet.jpg";
import img3 from "../images/cater-cook.jpg";
import "../styles/Landing.scss";

export default function Landing() {
  return (
    <>
      <Navbar />
      <div className="landing-body">
        <section className="container-1">
          <div className="image-sec">
            <img src={image} alt=""></img>
            <div className="img-overlay"></div>
            <div className="img-btn">
              <Link to="/Login" className="direct-btn">
                Request a Menu
              </Link>
            </div>
            <h1>
              <span>Ate Gangs</span> Catering Services
            </h1>
          </div>
        </section>
        <section className="container-2">
          <div className="text-description">
            <h1>
              {" "}
              Elevate your event with our flavorful creations, where every dish
              is more than a meal.
            </h1>
            <p>
              Welcome to Ate Gangs Catering Services. We serve and deliver well
              done catering dishes through Panabo, Tagum, and Davao City,
              Philippines.
            </p>
            <div className="desc-btn">
              <Link to="/Login" className="desc-text">
                Ready to Plan your Event?
              </Link>
            </div>
          </div>
        </section>
        <section className="container-3">
          <div className="mid-description">
            <div className="desc-1">
              <div className="img-container">
                <img src={img2} alt="" />
              </div>
              <div className="text-content">
                <h1>Dishes got Tastier!</h1>
                <p>
                Indulge in a culinary delight like never before! Our dishes are meticulously 
                crafted to tantalize your taste buds and leave you craving for more. From savory 
                to sweet, each bite is a symphony of flavors that will transport you to food paradise.
                </p>
                <div className="text-btn-container">
                  <div className="text-btn">explore our website</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mid-description">
            <div className="desc-1">
              <div className="text-content">
                <h1>Open Source Web</h1>
                <p>
                  LIndulge yourself in a gastronomic delight with our exquisite cuisine delivered to your doorsteps. Our service is impeccable, our food is delectable, and our prices are unbeatable. Don't miss this opportunity to treat yourself to a heavenly meal that will satisfy your taste buds and your wallet.
                </p>
                <div className="text-btn-container">
                  <div className="text-btn">explore our website</div>
                </div>
              </div>
              <div className="img-container">
                <img src={img3} alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="container-4">
          <div className="down-description">
            <h1>
              Explore a <span>tantalizing selection</span> of a{" "}
              <span>sample menus.</span>
            </h1>
            <p>
            We serve a wide range of tasty Filipino cuisine that suits the tastebuds of customers. Whether you crave for adobo, sigsig, or pancit, we have it all and more. Come and visit us today and experience the authentic flavors of the Philippines.
            </p>
            <div className="mid-btn">
              <Link to="/" className="mid-text">
                View Menus
              </Link>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    </>
  );
}
