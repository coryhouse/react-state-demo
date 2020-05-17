export async function getShoes() {
  return [
    { id: 1, name: "Hiker", price: 94.95, width: ["M"], sizes: [7, 8] },
    { id: 2, name: "Climber", price: 78.99, width: ["M"], sizes: [8, 9] },
    {
      id: 3,
      name: "Explorer",
      price: 145.95,
      width: ["N", "M", "W"],
      sizes: [7, 8, 9],
    },
  ];
}
