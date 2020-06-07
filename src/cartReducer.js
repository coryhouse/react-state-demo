export default function cartReducer(cart, action) {
  switch (action.type) {
    case "add": {
      const { id, size } = action;

      const alreadyInCart = cart.find((i) => i.id === id && i.size === size);
      if (alreadyInCart)
        return cart.map((i) => {
          const isMatchingItem = i.id === id && i.size === size;
          return isMatchingItem ? { ...i, quantity: i.quantity + 1 } : i;
        });
      return [...cart, { id, size, quantity: 1 }];
    }

    case "empty":
      return [];

    case "changeQuantity": {
      const { quantity, size, id } = action;
      if (quantity === 0) {
        // Keep items that have a different id, or have the same id, but a different size
        return cart.filter(
          (i) => i.id !== id || (i.id === id && i.size !== size)
        );
      }
      return cart.map((i) =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      );
    }

    default:
      throw new Error("Unhandled action" + action.type);
  }
}
