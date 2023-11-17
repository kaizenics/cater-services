import AdminSidebar from '../components/AdminSidebar'
import { BiPurchaseTagAlt } from 'react-icons/bi'
import { useState, useEffect } from 'react';
import '../styles/UserMgt.scss';

export default function UserMgt() {
  const [userPurchases, setUserPurchases] = useState([]);

  useEffect(() => {
    // Fetch user purchases data here and update the state
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/serverside/usermgt/getUserPurchases.php');
        const data = await response.json();

        if (data.success) {
          setUserPurchases(data.purchases || []);
        } else {
          console.error('Failed to fetch user purchases:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user purchases:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="user-container">
        <AdminSidebar />
        <section className="user-mgt-body">
          <div className="user-mgt-container">
            <div className="user-mgt-text">
              <BiPurchaseTagAlt className="purchase-tag" />
              <h1>Purchases</h1>
            </div>
          </div>
          <div className="purchase-history-ctn">
            {userPurchases.map((purchase, index) => (
              <div className="purchase-box" key={index}>
                <h1>Bill to: <span>{purchase.firstname} {purchase.lastname}</span></h1>
                <h1>Location: <span>{purchase.address}</span></h1>
                <h1>Invoice Number: <span>{purchase.invoiceNum}</span></h1>
                <h1>Ordered Item: <span>{purchase.orderedItem}</span></h1>
                <h1>Date Issued: <span>{purchase.addDate}</span></h1>
                <h1>Total Bill: <span>{purchase.totalbill} PHP</span></h1>
                <p>Remove</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
