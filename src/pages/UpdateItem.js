import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminPanel.scss";
import { useState, useEffect } from "react";

export default function UpdateItem() {
  const itemId = new URLSearchParams(window.location.search).get('id');
  const [data, setData] = useState({
    id: "",
    itemName: "",
    price: "",
    description: "",
    qty: "",
  });

  useEffect(() => {
    if (itemId) {
      fetch(`http://localhost/serverside/items/getItem.php?id=${itemId}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const itemData = data[0];
            setData({
              id: itemData.item_id,
              itemName: itemData.itemName,
              price: itemData.price,
              description: itemData.description,
              qty: itemData.qty,
            });
          }
        })
        .catch(error => console.log(error));
    }
  }, [itemId]);

  async function updateItemDataHandler() {
    console.log(JSON.stringify(data));

    if (data.itemName === '' || data.price === '' || data.description === '' || data.qty === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const url = `http://localhost/serverside/items/updateItem.php?id=${data.id}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
    
        alert(responseData[0].Message);
      } else {
        alert("Failed to update item information");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while updating item information");
    }
  }
  
  return (
    <>
      <div className="dashboard-container">
        <AdminSidebar />
        <div className="dashboard-page">
          <section className="add-item-sec">
            <div className="add-item-box">
              <h2>Update an Item</h2>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="itemName"
                  placeholder="Item Name"
                  value={data.itemName}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, itemName: e.target.value }));
                  }}
                />
              </div>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="price"
                  placeholder="Price"
                  value={data.price}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, price: e.target.value }));
                  }}
                />
              </div>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="description"
                  placeholder="Description"
                  value={data.description}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, description: e.target.value }));
                  }}
                />
              </div>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="quantity"
                  placeholder="Quantity"
                  value={data.qty}
                  onChange={(e) => {
                    setData((prevData) => ({ ...prevData, qty: e.target.value }));
                  }}
                />
              </div>
              <button
                className="add-btn-sec"
                onClick={() => updateItemDataHandler()}
              >
                Update Item
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
