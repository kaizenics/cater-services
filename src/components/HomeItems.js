import { Link } from 'react-router-dom';
import "../styles/Home.scss";

export default function HomeItems({ dishes }) {

  function handleOrderClick(dish) {
    const selectedDish = {
      ...dish,
      imageUrl: `http://localhost/serverside/items/${dish.imageUrl}` 
    }
    localStorage.setItem('selectedDish', JSON.stringify(selectedDish));
  }

  return (
    <section className="dish-grid">
      {dishes.map((desh, key) => (
        <div key={key} className="dish-container">
          <div className="dish-box">
            <img src={`http://localhost/serverside/items/${desh.imageUrl}`} className="dish-img" alt={desh.itemName}/>
            <div className="dish-desc">
              <h1>{desh.itemName}</h1>
              <p>₱ {desh.price}</p>
            </div>
            <p>{desh.description}</p>
            <Link to="/DishOrder">
              <button className="dish-btn" onClick={() => handleOrderClick(desh)}>Order now</button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}