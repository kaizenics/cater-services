import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import img2 from "../images/ategangsred.png";
import img3 from "../images/locationpic.png";
import '../styles/About.scss';

export default function About() {

  useEffect(() => {
    document.title = "About Us | Ate Gang's Catering Services";
  
    return () => {
      document.title = "Ate Gang's Catering Services";
    };
  }, []);
  
    return (
        <>
            <Navbar />
            <section>
            <div className="mid-description">
            <div className="desc-1">
              <div className="text-content1-about">
                <h1>About Us</h1>
    
              </div>
            </div>
            </div>
            </section>
            
            <section>
          <div className="mid-description">
            <div className="desc-1">
              <div className="text-content-about">
                <h1>Ate Gang’s Catering Services </h1>
                <p>
                Ate Gang's Catering Services is a local catering business in Panabo 
                that offers diverse daily offerings and door-to-door deliveries. 
                With an increasing demand for efficient and high-quality catering services, 
                enabling AGCS to make informed decisions and deliver exceptional service to its customers. 
                With a focus on quality control and customer satisfaction, AGCS is dedicated to adapting to 
                modern technologies and staying competitive in the market.
                </p>
              </div>
              
              <div className="img-container">
                <img src={img2} alt="" />
              </div>
            </div>
          </div>

          <div className="mid-description">
            <div className="desc-1">
              <div className="img-container">
                <img src={img3} alt="" />
              </div>
              <div className="text-content-about">
                <h1>We're Located Here!</h1>
                    <div className="text-content1-about">
                        <h3>Panabo, Davao Del Norte, <br/>Open Every Weekdays<br/> 8:00AM - 5:00PM!!</h3>
                  </div>
            
                
              </div>
            </div>
          </div>

        </section>
            <Footer />
        </>
        
       
    )
}

