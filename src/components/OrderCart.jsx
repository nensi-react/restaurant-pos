import "./OrderCart.css";

import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { calculateBill } from "../utils/calculateBill";
import { formatCurrency } from "../utils/formatCurrency";

import BillSummary from "./BillSummary";

export default function OrderCart({
  cart,
  setCart,
  table,
  setTable,
  onPlaceOrder,
  message,
}) {
  const bill = calculateBill(cart);

  // Increase or decrease item quantity
  function change(id, amount) {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove item from cart
  function removeItem(id) {
    setCart((oldCart) =>
      oldCart.filter((item) => item.id !== id)
    );
  }

  // Total quantity of all items
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <aside className="order-cart">
      {/* Cart Header */}
      <div className="cart-head">
        <div>
          <span className="eyebrow">CHECKOUT</span>
          <h2>Current order</h2>
        </div>

        <div className="cart-bag">
          <ShoppingBag size={19} />
          <span>{totalItems}</span>
        </div>
      </div>

      {/* Table Selection */}
      <label className="field-label" htmlFor="table-select">
        Table / service
      </label>

      <select
        id="table-select"
        value={table}
        onChange={(event) => setTable(event.target.value)}
      >
        {Array.from({ length: 12 }, (_, index) => {
          return `Table ${String(index + 1).padStart(2, "0")}`;
        }).map((tableName) => (
          <option key={tableName} value={tableName}>
            {tableName}
          </option>
        ))}
      </select>

      {/* Cart Items */}
      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <div>🧾</div>
            <h3>Your order is empty</h3>
            <p>
              Add items from the menu to start a new order.
            </p>
          </div>
        ) : (
          cart.map((item) => (
            <div className="cart-line" key={item.id}>
              <div className="cart-food-icon">
                {item.emoji}
              </div>

              <div className="cart-item-copy">
                <strong>{item.name}</strong>

                <span>
                  {formatCurrency(item.price)}
                </span>

                {/* Quantity Controls */}
                <div className="quantity-control">
                  <button
                    onClick={() => change(item.id, -1)}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    <Minus size={13} />
                  </button>

                  <b>{item.quantity}</b>

                  <button
                    onClick={() => change(item.id, 1)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <div className="cart-line-end">
                <strong>
                  {formatCurrency(
                    item.price * item.quantity
                  )}
                </strong>

                <button
                  className="remove-button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bill Summary */}
      <BillSummary bill={bill} />

      {/* Status Message */}
      {message && (
        <div
          className={`notice ${
            message.toLowerCase().includes("success")
              ? "success"
              : ""
          }`}
          role="status"
        >
          {message}
        </div>
      )}

      {/* Place Order */}
      <button
        className="place-order"
        disabled={cart.length === 0}
        onClick={onPlaceOrder}
      >
        Place order
        <span> · {formatCurrency(bill.total)}</span>
      </button>

      <p className="secure-note">
        🔒 Order details are saved in this session
      </p>
    </aside>
  );
}
