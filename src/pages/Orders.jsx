import "./Orders.css";

import { ClipboardList, ReceiptText } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export default function Orders({ orders, onViewReceipt }) {
  return (
    <div className="page-content">
      {/* Page Heading */}
      <div className="page-intro">
        <div>
          <span className="eyebrow">ORDER HISTORY</span>
          <h2>All orders</h2>
          <p>
            Review completed transactions and print customer receipts.
          </p>
        </div>

        <span className="item-count">
          {orders.length} orders
        </span>
      </div>

      {/* Orders Table */}
      <section className="surface orders-surface">
        {orders.length === 0 ? (
          <div className="dashboard-empty">
            <div className="empty-illustration">
              <ClipboardList size={38} />
            </div>

            <h3>No orders to show</h3>

            <p>
              Orders created from the POS Terminal will appear here.
            </p>
          </div>
        ) : (
          <div className="orders-table">
            {/* Table Header */}
            <div className="table-header">
              <span>ORDER ID</span>
              <span>TABLE</span>
              <span>ITEMS</span>
              <span>DATE &amp; TIME</span>
              <span>TOTAL</span>
              <span>ACTION</span>
            </div>

            {/* Order Rows */}
            {orders.map((order) => {
              const totalItems = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              );

              return (
                <div className="recent-row" key={order.id}>
                  <strong>
                    #{String(order.id).slice(-6)}
                  </strong>

                  <span>{order.table}</span>

                  <span>{totalItems} items</span>

                  <span>{order.time}</span>

                  <strong>
                    {formatCurrency(order.total)}
                  </strong>

                  <button
                    className="receipt-button"
                    onClick={() => onViewReceipt(order)}
                    aria-label={`View receipt for order ${order.id}`}
                  >
                    <ReceiptText size={15} />
                    Receipt
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
