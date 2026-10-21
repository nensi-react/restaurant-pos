import "./POS.css";

import { ShoppingCart } from "lucide-react";

import FoodMenu from "../components/FoodMenu";
import OrderCart from "../components/OrderCart";

export default function POS({
  menu,
  cart,
  setCart,
  table,
  setTable,
  onPlaceOrder,
  message,
}) {
  // Add food item to cart
  function add(item) {
    setCart((oldCart) => {
      const existingItem = oldCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return oldCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...oldCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  }

  return (
    <div className="page-content">
      {/* Page Heading */}
      <div className="page-intro">
        <div>
          <span className="eyebrow">
            FAST & SIMPLE CHECKOUT
          </span>

          <h2>Point of Sale</h2>

          <p>
            Take orders, manage items and checkout in one place.
          </p>
        </div>

        <div className="live-pill">
          <i />
          System operational
        </div>
      </div>

      {/* POS Layout */}
      <div className="pos-layout">
        <FoodMenu
          menu={menu}
          onAdd={add}
        />

        <OrderCart
          cart={cart}
          setCart={setCart}
          table={table}
          setTable={setTable}
          onPlaceOrder={onPlaceOrder}
          message={message}
        />
      </div>
    </div>
  );
}
