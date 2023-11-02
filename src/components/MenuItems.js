import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import "../styles/AdminPanel.scss";

export default function MenuItems({ menu }) {
  function deleteItem(itemId) {
    fetch(`http://localhost/serverside/items/deleteItem.php?id=${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        alert(data.Message);
        window.location.href = '/AdminPanel';
      })
      .catch((error) => console.error("Error:", error));
  }
  return (
    <>
      <div className="crud-opt">
        <div className="crud-text">
          <h2>Menu Items</h2>
          <Link to="/AddItem" className="add-btn">
            <HiPlus className="hiplus-icon" />
          </Link>
        </div>
        <table className="crud-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Item Image</th>
              <th>Action</th>
            </tr>
          </thead>
          {menu.map((cont, key) => (
            <tbody key={key}>
              <tr>
                <td>{cont.itemName}</td>
                <td>{cont.price}</td>
                <td>{cont.description}</td>
                <td>{cont.qty}</td>
                <td>{cont.imageUrl && cont.imageUrl.split("/").pop()}</td>
                <td>
                  <Link to="/UpdateItem">
                    <button className="edit-btn">Edit</button>
                  </Link>
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(cont.item_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <button className="next-list-item">Next</button>
      </div>
    </>
  );
}
