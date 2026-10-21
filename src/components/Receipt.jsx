import "./Receipt.css";

import { X, Printer } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export default function Receipt({ order, onClose }) {
  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
    >
      <section
        className="receipt-modal"
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-label="Order receipt"
      >
        {/* Close Button */}
        <button
          className="modal-close no-print"
          onClick={onClose}
          aria-label="Close receipt"
        >
          <X size={18} />
        </button>

        {/* Restaurant Branding */}
        <div className="receipt-brand">
          🍽 <strong>RestoPro</strong>
        </div>

        <p className="receipt-subtitle">
          THANK YOU FOR DINING WITH US
        </p>

        <hr />

        {/* Order Information */}
        <p>Order: #{String(order.id).slice(-6)}</p>

        <p>
          {order.table} · {order.time}
        </p>

        <hr />

        {/* Ordered Items */}
        {order.items.map((item) => (
          <div className="receipt-row" key={item.id}>
            <span>
              {item.name} × {item.quantity}
            </span>

            <strong>
              {formatCurrency(item.price * item.quantity)}
            </strong>
          </div>
        ))}

        <hr />

        {/* Bill Details */}
        <div className="receipt-row">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>

        <div className="receipt-row">
          <span>Tax</span>
          <span>{formatCurrency(order.tax)}</span>
        </div>

        <div className="receipt-row receipt-total">
          <strong>Total</strong>
          <strong>{formatCurrency(order.total)}</strong>
        </div>

        {/* Thank You Message */}
        <p className="receipt-thanks">
          We hope to see you again!
        </p>

        {/* Print Receipt */}
        <button
          className="primary-button no-print"
          onClick={handlePrint}
        >
          <Printer size={16} />
          Print receipt
        </button>
      </section>
    </div>
  );
}
