import "./FoodCard.css";
import { Plus } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
export default function FoodCard({ item, onAdd }) {
  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";
    event.currentTarget.parentElement.classList.add("photo-fallback");
  };
  return (
    <article className={`food-card ${!item.available ? "sold-out" : ""}`}>
      <div className="food-photo">
        <img src={item.image} alt={item.name} onError={handleImageError} />
        <span className="food-emoji">{item.emoji}</span>
        <span className="food-category">{item.category}</span>
      </div>
      <div className="food-info">
        <h3>{item.name}</h3>
        <div className="food-bottom">
          <strong>{formatCurrency(item.price)}</strong>
          <button className="add-button" disabled={!item.available} onClick={() => onAdd(item)} aria-label={`Add ${item.name}`}>
            <Plus size={18} />
          </button>
        </div>
        {!item.available && <small className="unavailable">Currently unavailable</small>}
      </div>
    </article>
  );
}