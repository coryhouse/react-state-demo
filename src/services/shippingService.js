const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getShippingAddress(userId) {
  return fetch(baseUrl + "shippingAddress/" + userId).then((response) => {
    if (response.ok) return response.json();
    throw new Error("Bad network request.");
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
