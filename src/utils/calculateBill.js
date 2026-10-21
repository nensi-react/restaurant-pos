export function calculateBill(cart) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;

  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
}
