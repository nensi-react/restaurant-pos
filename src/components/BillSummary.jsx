import "./BillSummary.css";
import { formatCurrency } from "../utils/formatCurrency";
export default function BillSummary({ bill }) {
  return (
    <div className="bill-summary">
      <div>
        <span>Subtotal</span>
        <strong>{formatCurrency(bill.subtotal)}</strong>
      </div>
      <div>
        <span>Tax (5%)</span>
        <strong>{formatCurrency(bill.tax)}</strong>
      </div>
      <div className="bill-total">
        <span>Total amount</span>
        <strong>{formatCurrency(bill.total)}</strong>
      </div>
    </div>
  );
}