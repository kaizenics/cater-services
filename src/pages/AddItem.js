import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminPanel.scss";
import { useState } from "react";

export default function AddItem() {
    const [imageFile, setImageFile] = useState(null);
    const [data, setData] = useState({
      itemName: '',
      price: '',
      description: '',
      qty: '',
    });
  
    async function addItemDataHandler(data) {
      if (data.itemName === '' || data.price === '' || data.description === '' || data.qty === '' || !imageFile) {
        alert('Please fill in all fields and upload an image');
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('itemName', data.itemName);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('qty', data.qty);
        formData.append('image', imageFile);
  
        const res = await fetch('http://localhost/serverside/items/addItem.php', {
          method: 'POST',
          body: formData,
        });
  
        const response = await res.json();
  
        if (response[0].Message) {
          alert(response[0].Message);

        }
      } catch (error) {
        console.error(error);
      }
    }
  
    function handleImageUpload(event) {
      const file = event.target.files[0];
      setImageFile(file);
    }

  return (
    <>
      <div className="dashboard-container">
        <AdminSidebar />
        <div className="dashboard-page">
          <section className="add-item-sec">
            <div className="add-item-box">
              <h2>Add New Item</h2>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="itemName"
                  placeholder="Item Name"
                  onChange={(e) => {
                    setData({ ...data, itemName: e.target.value });
                  }}
                />
              </div>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="price"
                  placeholder="Price"
                  onChange={(e) => {
                    setData({ ...data, price: e.target.value });
                  }}
                />
              </div>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="description"
                  placeholder="Description"
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                />
              </div>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="quantity"
                  placeholder="Quantity"
                  onChange={(e) => {
                    setData({ ...data, qty: e.target.value });
                  }}
                />
              </div>
              <div className="form-group-1">
                <input
                  type="file"
                  id="image"
                  placeholder=""
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <button
                className="add-btn-sec"
                onClick={() => addItemDataHandler(data)}
              >
                Add Item
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
