import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import '../styles/Profile.scss'
import { BiUser } from "react-icons/bi";


export default function Profile() {
  return (
    <>
      <HomeNav />

      <section className="profile-body">
        <div className="profile-container">
            <div className="profile-text">
                <BiUser className="profile-user-icon"/>
                <h1>Profile</h1>
            </div>
          <div className="profile-info">
            <h1>Niko Soriano</h1>
            <h2>Current Location: <span>Purok Chico, Barangay Sto. Nino, Panabo City</span></h2>
            <h2>Mobile Number: <span>09123456789</span></h2>
          </div>
         <div className="profile-box-ctn">
          <div className="profile-info-box">
            <h1>Invoice Number: <span>4508</span></h1>
            <h1>Ordered Item: <span>1 x Bicol Express, 4 x Lechon Baboy</span></h1>
            <h1>Date Issued: <span>11/11/2023</span></h1>
            <h1>Total Bill: <span>450 PHP</span></h1>
          </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
