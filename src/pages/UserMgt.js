import AdminSidebar from "../components/AdminSidebar";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { useState, useEffect } from "react";
import "../styles/UserMgt.scss";

export default function UserMgt() {
  const [userPurchases, setUserPurchases] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost/serverside/usermgt/getUserPurchases.php"
      );
      const data = await response.json();

      if (data.success) {
        setUserPurchases(data.purchases || []);
      } else {
        console.error("Failed to fetch user purchases:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user purchases:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemoveOrderItem = async (invoiceNum) => {
    const confirmation = window.confirm(
      "Are you sure you want to remove this item? It also cancels the order when you remove the item. Proceed?"
    );
    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/serverside/usermgt/removeItemOrder.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            invoiceNum: invoiceNum,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Item removed successfully");
        setUserPurchases((prevPurchases) =>
          prevPurchases.filter((purchase) => purchase.invoiceNum !== invoiceNum)
        );
      } else {
        console.error("Failed to remove item:", data.error);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleOrderDone = async (invoiceNum) => {
    const confirmation = window.confirm("Are you sure the order is done?");
    if (!confirmation) {
      return;
    }
    window.location.href = '/UserMgt';

    try {
      const response = await fetch(
        "http://localhost/serverside/usermgt/deductQuantities.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            invoiceNum: invoiceNum,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Quantities deducted successfully");
        
      } else {
        console.error("Failed to deduct quantities:", data.error);
      }
    } catch (error) {
      console.error("Error deducting quantities:", error);
    }
  };

  useEffect(() => {
    document.title = "Orders | Ate Gang's Catering Services";
  
    return () => {
      document.title = "Ate Gang's Catering Services";
    };
  }, []);

  return (
    <>
      <div className="user-container">
        <AdminSidebar />
        <section className="user-mgt-body">
          <div className="user-mgt-container">
            <div className="user-mgt-text">
              <BiPurchaseTagAlt className="purchase-tag" />
              <h1>Orders</h1>
            </div>
          </div>
          <div className="purchase-history-ctn">
            {userPurchases.map((purchase, index) => (
              <div className="purchase-box" key={index}>
                <h1>
                  Bill to:{" "}
                  <span>
                    {purchase.firstname} {purchase.lastname}
                  </span>
                </h1>
                <h1>
                  Location: <span>{purchase.address}</span>
                </h1>
                <h1>
                  Invoice Number: <span>{purchase.invoiceNum}</span>
                </h1>
                <h1>
                  Ordered Item: <span>{purchase.orderedItem}</span>
                </h1>
                <h1>
                  Date Issued: <span>{purchase.addDate}</span>
                </h1>
                <h1>
                  Total Bill: <span>{purchase.totalbill} PHP</span>
                </h1>
                <h2>
                  Status:{" "}
                  <span
                    className={
                      purchase.status === "Not yet Delivered"
                        ? "status-not-delivered"
                        : "status-delivered"
                    }
                  >
                    {purchase.status}
                  </span>
                </h2>

                <div className="user-mgt-btn">
                  <h1 onClick={() => handleOrderDone(purchase.invoiceNum)}>
                    Order Done
                  </h1>
                  <h2
                    onClick={() => handleRemoveOrderItem(purchase.invoiceNum)}
                  >
                    Remove
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
