const baseUrl = "http://localhost:3001/";

export async function getShoes() {
  const response = await fetch(baseUrl + "shoes");
  if (response.ok) return response.json();
}

export async function getShoe(id) {
  const response = await fetch(baseUrl + "shoes/" + id);
  if (response.ok) return response.json();
}
