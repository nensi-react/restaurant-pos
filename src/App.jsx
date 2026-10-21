import { useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Receipt from "./components/Receipt";

import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Orders from "./pages/Orders";
import Tables from "./pages/Tables";
import MenuManagement from "./pages/MenuManagement";

import { initialMenu } from "./data/menuData";
import { calculateBill } from "./utils/calculateBill";

const pageTitles = {
  dashboard: "Dashboard",
  pos: "POS Terminal",
  orders: "Orders",
  tables: "Tables",
  menu: "Menu Management",
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [menu, setMenu] = useState(initialMenu);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [table, setTable] = useState("Table 01");
  const [message, setMessage] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Navigate between pages
  function navigateTo(page, selectedTable) {
    setActivePage(page);

    if (selectedTable) {
      setTable(selectedTable);
    }

    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Place a restaurant order
  function placeOrder() {
    if (cart.length === 0) {
      setMessage("Please add food items before placing an order.");
      return;
    }

    const bill = calculateBill(cart);

    const newOrder = {
      id: Date.now(),
      table,
      items: cart.map((item) => ({ ...item })),
      subtotal: bill.subtotal,
      tax: bill.tax,
      total: bill.total,
      time: new Date().toLocaleString("en-IN"),
      status: "Completed",
    };

    setOrders((oldOrders) => [newOrder, ...oldOrders]);
    setCart([]);
    setMessage("Order placed successfully!");
  }

  // Display the selected page
  function renderPage() {
    switch (activePage) {
      case "pos":
        return (
          <POS
            menu={menu}
            cart={cart}
            setCart={setCart}
            table={table}
            setTable={setTable}
            onPlaceOrder={placeOrder}
            message={message}
          />
        );

      case "orders":
        return (
          <Orders
            orders={orders}
            onViewReceipt={setSelectedReceipt}
          />
        );

      case "tables":
        return (
          <Tables
            orders={orders}
            onNavigate={navigateTo}
          />
        );

      case "menu":
        return (
          <MenuManagement
            menu={menu}
            setMenu={setMenu}
          />
        );

      default:
        return (
          <Dashboard
            orders={orders}
            menu={menu}
            onNavigate={navigateTo}
          />
        );
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={navigateTo}
      />

      <main className="main">
        <Navbar title={pageTitles[activePage]} />

        {renderPage()}

        <footer className="footer">
          <span>© 2026 RestoPro · Restaurant POS System</span>
          <span>Designed for smarter restaurant management</span>
        </footer>
      </main>

      {selectedReceipt && (
        <Receipt
          order={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}
