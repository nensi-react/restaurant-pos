import "./MenuManagement.css";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";

import { formatCurrency } from "../utils/formatCurrency";

const blank = {
  name: "",
  category: "Burgers",
  price: "",
  emoji: "🍽️",
  image: "",
  available: true,
};

export default function MenuManagement({ menu, setMenu }) {
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState("");

  // Handle form submission
  function submit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const price = Number(form.price);

    if (!name || !Number.isFinite(price) || price <= 0) {
      setNotice("Please enter a valid name and price.");
      return;
    }

    const item = {
      ...form,
      name,
      id: editing ?? Date.now(),
      price,
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=700",
    };

    if (editing !== null) {
      setMenu((oldMenu) =>
        oldMenu.map((food) =>
          food.id === editing ? item : food
        )
      );

      setNotice("Menu item updated successfully.");
    } else {
      setMenu((oldMenu) => [item, ...oldMenu]);

      setNotice("New menu item added successfully.");
    }

    setForm({ ...blank });
    setEditing(null);
  }

  // Edit an existing item
  function edit(item) {
    setEditing(item.id);

    setForm({
      ...item,
      price: String(item.price),
    });

    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Delete an item
  function remove(id) {
    const confirmed = window.confirm(
      "Delete this menu item?"
    );

    if (!confirmed) return;

    setMenu((oldMenu) =>
      oldMenu.filter((item) => item.id !== id)
    );

    if (editing === id) {
      setForm({ ...blank });
      setEditing(null);
    }

    setNotice("Menu item deleted successfully.");
  }

  // Toggle item availability
  function toggleAvailability(id) {
    setMenu((oldMenu) =>
      oldMenu.map((item) =>
        item.id === id
          ? { ...item, available: !item.available }
          : item
      )
    );
  }

  // Cancel editing
  function cancelEdit() {
    setForm({ ...blank });
    setEditing(null);
    setNotice("");
  }

  return (
    <div className="page-content">
      {/* Page Heading */}
      <div className="page-intro">
        <div>
          <span className="eyebrow">KITCHEN CATALOGUE</span>
          <h2>Menu management</h2>
          <p>
            Add, edit and manage the items served at your restaurant.
          </p>
        </div>

        <span className="item-count">
          {menu.length} menu items
        </span>
      </div>

      {/* Add or Edit Form */}
      <section className="surface form-surface">
        <div className="section-heading">
          <div>
            <h2>
              {editing !== null
                ? "Edit menu item"
                : "Add a menu item"}
            </h2>

            <p>
              Keep your restaurant catalogue fresh and accurate.
            </p>
          </div>

          <span className="form-icon">
            <UtensilsCrossed size={20} />
          </span>
        </div>

        <form className="menu-form" onSubmit={submit}>
          <label>
            Item name
            <input
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
              placeholder="e.g. Spicy paneer burger"
              required
            />
          </label>

          <label>
            Category
            <select
              value={form.category}
              onChange={(event) =>
                setForm({
                  ...form,
                  category: event.target.value,
                })
              }
            >
              {[
                "Burgers",
                "Pizza",
                "Pasta",
                "Sides",
                "Drinks",
                "Desserts",
              ].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Price (₹)
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={(event) =>
                setForm({
                  ...form,
                  price: event.target.value,
                })
              }
              placeholder="249"
              required
            />
          </label>

          <label>
            Emoji / icon
            <input
              value={form.emoji}
              onChange={(event) =>
                setForm({
                  ...form,
                  emoji: event.target.value,
                })
              }
              placeholder="🍔"
            />
          </label>

          <label className="form-wide">
            Food image URL (optional)
            <input
              type="url"
              value={form.image}
              onChange={(event) =>
                setForm({
                  ...form,
                  image: event.target.value,
                })
              }
              placeholder="https://example.com/food.jpg"
            />
          </label>

          <div className="form-actions">
            <button className="primary-button" type="submit">
              <Plus size={16} />
              {editing !== null
                ? "Save changes"
                : "Add menu item"}
            </button>

            {editing !== null && (
              <button
                className="secondary-button"
                type="button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {notice && (
          <p className="form-notice" role="status">
            {notice}
          </p>
        )}
      </section>

      {/* Menu Catalogue */}
      <section className="surface catalogue-surface">
        <div className="section-heading">
          <div>
            <h2>Your menu</h2>
            <p>Toggle availability or edit the details.</p>
          </div>
        </div>

        {menu.length === 0 ? (
          <p className="muted">
            No menu items yet. Add your first item above.
          </p>
        ) : (
          <div className="catalogue-list">
            {menu.map((item) => (
              <div className="catalogue-row" key={item.id}>
                <div className="catalogue-emoji">
                  {item.emoji || "🍽️"}
                </div>

                <div className="catalogue-details">
                  <strong>{item.name}</strong>

                  <span>
                    {item.category} ·{" "}
                    {formatCurrency(item.price)}
                  </span>
                </div>

                <button
                  className={`availability-toggle ${
                    item.available ? "is-available" : ""
                  }`}
                  onClick={() => toggleAvailability(item.id)}
                >
                  {item.available
                    ? "Available"
                    : "Unavailable"}
                </button>

                <button
                  className="round-action"
                  onClick={() => edit(item)}
                  aria-label={`Edit ${item.name}`}
                >
                  <Pencil size={15} />
                </button>

                <button
                  className="round-action danger"
                  onClick={() => remove(item.id)}
                  aria-label={`Delete ${item.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
