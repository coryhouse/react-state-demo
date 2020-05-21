export async function getShoes() {
  return [
    {
      id: 1,
      name: "Hiker",
      price: 94.95,
      width: ["M"],
      sizes: [7, 8],
      description: "This rugged boot will get you up the mountain safely.",
    },
    {
      id: 2,
      name: "Climber",
      price: 78.99,
      width: ["M"],
      sizes: [8, 9],
      description: "Sure-footed traction in slippery conditions.",
    },
    {
      id: 3,
      name: "Explorer",
      price: 145.95,
      width: ["N", "M", "W"],
      sizes: [7, 8, 9],
      description: "Look stylish while stomping in the mud.",
    },
  ];
}

export async function saveShipping(shippingInfo) {
  return await setTimeout(() => {
    console.log("saving shipping info", shippingInfo);
    return new Promise((resolve) => {
      resolve({
        statusCode: 200,
      });
    });
  }, 2000);
}
