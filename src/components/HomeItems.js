import { useEffect, useState } from "react";
import "../styles/Home.scss";

export default function HomeItems({ dishes }) {
  return (
    <section className="dish-grid">
      {dishes.map((desh, key) => (
        <div key={key} className="dish-container">
          <div className="dish-box">
            <img src={`http://localhost/serverside/items/${desh.imageUrl}`} className="dish-img" alt={desh.itemName}/>
            <div className="dish-desc">
              <h1>{desh.itemName}</h1>
              <p>{desh.price} PHP</p>
            </div>
            <p>{desh.description}</p>
            <button className="dish-btn">Order now</button>
          </div>
        </div>
      ))}
    </section>
  );
}
