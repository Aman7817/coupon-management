export function computeCartValue(cart) {
  if (!cart || !Array.isArray(cart.items)) return 0;
  return cart.items.reduce((sum, it) => {
    const unit = Number(it.unitPrice) || 0;
    const qty = Number(it.quantity) || 0;
    return sum + unit * qty;
  }, 0);
}

export function totalItemsCount(cart) {
  if (!cart || !Array.isArray(cart.items)) return 0;
  return cart.items.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
}

export function categoriesInCart(cart) {
  if (!cart || !Array.isArray(cart.items)) return [];
  // unique categories
  const set = new Set();
  for (const it of cart.items) {
    if (it.category) set.add(it.category);
  }
  return Array.from(set);
}
