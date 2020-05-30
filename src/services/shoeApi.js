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


