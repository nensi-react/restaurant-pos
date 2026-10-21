import "./FoodMenu.css";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import FoodCard from "./FoodCard";
export default function FoodMenu({ menu, onAdd }) {
  const [category, setCategory] = useState("All items");
  const [search, setSearch] = useState("");
  const categories = ["All items", ...new Set(menu.map((item) => item.category))];
  const filtered = useMemo(() => {
    return menu.filter((item) => {
      const matchesCategory = category === "All items" || item.category === category;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menu, category, search]);
  return (
    <section className="menu-panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">OUR KITCHEN</span>
          <h2>Explore menu</h2>
          <p>Choose delicious items for your order.</p>
        </div>
        <span className="item-count">{filtered.length} items</span>
      </div>
      <div className="menu-search">
        <Search size={17} />
        <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search food items..." aria-label="Search food items" />
        <SlidersHorizontal size={17} />
      </div>
      <div className="category-row">
        {categories.map((itemCategory) => (
          <button key={itemCategory} className={category === itemCategory ? "selected" : ""} onClick={() => setCategory(itemCategory)}>
            {itemCategory}
          </button>
        ))}
      </div>
      <div className="food-grid">
        {filtered.map((item) => (
          <FoodCard key={item.id} item={item} onAdd={onAdd} />
        ))}
        {filtered.length === 0 && <div className="empty-state">No menu items found. Try another search.</div>}
      </div>
    </section>
  );
}