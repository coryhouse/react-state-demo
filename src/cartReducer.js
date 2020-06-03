export default function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const { id, size } = action;
      const alreadyInCart = state.find((s) => s.id === id && s.size === size);
      return alreadyInCart
        ? state.map((c) =>
            c.id === id && c.size === size
              ? { ...c, quantity: parseInt(c.quantity) + 1 }
              : c
          )
        : [...state, { id, size, quantity: 1 }];
    }

    case "empty":
      return [];

    case "changeQuantity": {
      const { quantity, size, id } = action;
      return quantity === 0
        ? state.filter((c) => c.size !== size && c.id !== id)
        : state.map((c) =>
            c.id === id && c.size === size ? { ...c, quantity } : c
          );
    }

    default:
      throw new Error("Unhandled action" + action.type);
  }
}
