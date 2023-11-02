import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminPanel.scss";
import { useState } from "react";

export default function UpdateItem() {
  const [imageFile, setImageFile] = useState(null);
  const [data, setData] = useState({
    id: "",
    itemName: "",
    price: "",
    description: "",
    qty: "",
  });

  async function updateItemDataHandler(data) {
    if (
      data.itemName === "" ||
      data.price === "" ||
      data.description === "" ||
      data.qty === "" ||
      !imageFile
    ) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("itemName", data.itemName);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("qty", data.qty);
      formData.append("image", imageFile);

      const res = await fetch(
        `http://localhost/serverside/items/updateItem.php?id=${data.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

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
              <h2>Update an Item</h2>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="itemName"
                  placeholder=""
                  onChange={(e) => {
                    setData({ ...data, itemName: e.target.value });
                  }}
                />
                <label for="email">Item Name</label>
              </div>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="price"
                  placeholder=""
                  onChange={(e) => {
                    setData({ ...data, price: e.target.value });
                  }}
                />
                <label for="email">Price</label>
              </div>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="description"
                  placeholder=""
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                />
                <label for="email">Description</label>
              </div>
              <div className="form-group-1">
                <input
                  type="text"
                  autoComplete="off"
                  id="quantity"
                  placeholder=""
                  onChange={(e) => {
                    setData({ ...data, qty: e.target.value });
                  }}
                />
                <label for="email">Quantity</label>
              </div>
              <div className="form-group-1">
                <input
                  type="file"
                  id="image"
                  placeholder=""
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image">Upload Image:</label>
              </div>
              <button
                className="add-btn-sec"
                onClick={() => updateItemDataHandler(data)}
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
