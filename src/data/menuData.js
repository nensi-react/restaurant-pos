export const initialMenu = [
  {
    id: 1,
    name: "Classic Cheeseburger",
    category: "Burgers",
    price: 249,
    emoji: "🍔",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700",
    available: true,
  },
  {
    id: 2,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 399,
    emoji: "🍕",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=700",
    available: true,
  },
  {
    id: 3,
    name: "Creamy Alfredo Pasta",
    category: "Pasta",
    price: 289,
    emoji: "🍝",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700",
    available: true,
  },
  {
    id: 4,
    name: "Crispy French Fries",
    category: "Sides",
    price: 129,
    emoji: "🍟",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700",
    available: true,
  },
  {
    id: 5,
    name: "Iced Latte",
    category: "Drinks",
    price: 149,
    emoji: "🧋",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700",
    available: true,
  },
  {
    id: 6,
    name: "Chocolate Dessert",
    category: "Desserts",
    price: 199,
    emoji: "🍰",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700",
    available: true,
  },
  {
    id: 7,
    name: "Grilled Sandwich",
    category: "Sides",
    price: 179,
    emoji: "🥪",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700",
    available: true,
  },
  {
    id: 8,
    name: "Fresh Lemonade",
    category: "Drinks",
    price: 99,
    emoji: "🍋",
    image:
      "https://images.unsplash.com/photo-1513558161293-caad7e1b9abb?w=700",
    available: true,
  },
];

// Restaurant table data
export const restaurantTables = Array.from(
  { length: 12 },
  (_, index) => ({
    id: index + 1,
    name: `Table ${String(index + 1).padStart(2, "0")}`,
    seats: index % 3 === 0 ? 4 : 2,
  })
);
