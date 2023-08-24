import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import image from "../images/cater1.png"
import '../styles/Landing.scss';

export default function Landing() {
    return (
        <>
            <Navbar/>
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
                    <h1>Rustic, elegant catering by great people. Serving San Diego, Palm Springs, Joshua Tree, & beyond.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec pretium erat. Donec rutrum, ipsum at tincidunt ornare, mi est efficitur dolor, vitae gravida sapien arcu id metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec.</p>
                    <div className="desc-btn">
                        <Link to="/" className="desc-text">Ready to Plan your Event?</Link>
                    </div>
                </div>
             </section>
            </div>
        </>
    );
}