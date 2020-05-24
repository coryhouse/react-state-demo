const baseUrl = "http://localhost:3001/";

export async function getShoes() {
  return fetch(baseUrl + "shoes").then((response) => {
    if (response.ok) return response.json();
  });
}

export async function getShoe(key, shoeId) {
  return fetch(baseUrl + "shoes/" + shoeId).then((response) => {
    if (response.ok) return response.json();
  });
}

export async function saveShippingAddress(address) {
  return fetch(baseUrl + "shippingAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
}
