import HomeNav from "../components/HomeNav";
import Footer from "../components/Footer";
import "../styles/Profile.scss";
import { useState, useEffect } from "react";
import { BiUser } from "react-icons/bi";

export default function Profile() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    mobileNum: "",
    address: "",
  });

  useEffect(() => {
  const firstName = window.localStorage.getItem("firstname") || "";
  const accountId = window.localStorage.getItem("accountId");

  const fetchUserDetails = async () => {
    const url = `http://localhost/serverside/auth/userDetails.php?account_id=${accountId}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.success) {
      const { firstName, lastName, mobileNum, address } = data.user;
      setUserInfo({ firstName, lastName, mobileNum, address });
    } else {
      console.error("Failed to fetch user details");
    }
  };

  fetchUserDetails();

  const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  setOrderDetails(storedOrders);

}, []);


  const groupOrdersIntoRows = (orders) => {
    const result = [];
    let currentRow = [];

    orders.forEach((order, index) => {
      currentRow.push(order);

      if (currentRow.length === 3 || index === orders.length - 1) {
        result.push([...currentRow]);
        currentRow = [];
      }
    });

    return result;
  };

  return (
    <>
      <HomeNav />

      <section className="profile-body">
        <div className="profile-container">
          <div className="profile-text">
            <BiUser className="profile-user-icon" />
            <h1>Profile</h1>
          </div>
          <div className="profile-info">
            <h1>{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
            <h2>
              Current Location: <span>{userInfo.address}</span>
            </h2>
            <h2>
              Mobile Number: <span>{userInfo.mobileNum}</span>
            </h2>
          </div>
          <div className="profile-box-ctn">
            {groupOrdersIntoRows(orderDetails).map((row, rowIndex) => (
              <div className="profile-info-row" key={rowIndex}>
                {row.map((order, index) => (
                  <div className="profile-info-box" key={index}>
                    <h1>
                      Invoice Number: <span>{order.invoiceNum}</span>
                    </h1>
                    <h1>
                      Ordered Item:{" "}
                      <span>
                        {order.items &&
                          order.items
                            .map((item) => `${item.quantity} x ${item.itemName}`)
                            .join(", ")}
                      </span>
                    </h1>
                    <h1>
                      Date Issued: <span>{order.addDate}</span>
                    </h1>
                    <h1>
                      Total Bill: <span>{order.totalbill}</span>
                    </h1>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
