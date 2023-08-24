import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import image from "../images/cater1.png"
import img2 from "../images/catering-buffet.jpg"
import img3 from "../images/cater-cook.jpg"
import '../styles/Landing.scss';

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
                            <Link to="/" className="direct-btn">Request a Menu</Link>
                        </div>
                        <h1><span>Ate Gangs</span> Catering Services</h1>
                    </div>
                </section>
                <section className="container-2">
                    <div className="text-description">
                        <h1> Elevate your event with our flavorful creations, where every dish is more than a meal.</h1>
                        <p>Welcome to Ate Gangs Catering Services. We serve and deliver well done catering dishes through Panabo, Tagum, and Davao City, Philippines.</p>
                        <div className="desc-btn">
                            <Link to="/" className="desc-text">Ready to Plan your Event?</Link>
                        </div>
                    </div>
                </section>
                <section className="container-3">
                    <div className="mid-description">
                        <div className="desc-1">
                            <div className="img-container">
                                <img src={img2} alt=""/>
                            </div>
                            <div className="text-content">
                                <h1>Dishes got Tastier!</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam elit at velit aliquam posuere. Aenean neque risus, interdum at dapibus vel, vestibulum eget lacus.</p>
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
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Suspendisse aliquam elit at velit aliquam posuere. Aenean neque risus, interdum at dapibus vel, vestibulum eget lacus.</p>
                                <div className="text-btn-container">
                                    <div className="text-btn">explore our website</div>
                                </div>
                            </div>
                            <div className="img-container">
                                <img src={img3} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}