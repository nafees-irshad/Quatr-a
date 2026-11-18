import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const load = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

// Adds items into a list, merging same id + size
const mergeItems = (list, incoming) => {
  let result = [...list];
  incoming.forEach((item) => {
    const idx = result.findIndex(
      (x) => x.id === item.id && x.size === item.size,
    );
    if (idx > -1) {
      result = result.map((x, i) =>
        i === idx ? { ...x, quantity: x.quantity + item.quantity } : x,
      );
    } else {
      result.push(item);
    }
  });
  return result;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => load("quatrea_cart", []));
  // checkout = { items: [], source: "cart" | "buyNow" }
  const [checkout, setCheckout] = useState(() =>
    load("quatrea_checkout", { items: [], source: "cart" }),
  );
  const [orders, setOrders] = useState(() => load("quatrea_orders", []));
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("quatrea_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("quatrea_checkout", JSON.stringify(checkout));
  }, [checkout]);

  useEffect(() => {
    localStorage.setItem("quatrea_orders", JSON.stringify(orders));
  }, [orders]);

  /* ───────── Cart ───────── */
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => mergeItems(prev, [{ ...product, quantity }]));
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size)),
    );
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  /* ───────── Checkout ───────── */

  // Cart page -> Checkout: moves items out of the cart
  const checkoutFromCart = () => {
    if (cart.length === 0) return false;
    setCheckout({ items: cart, source: "cart" });
    setCart([]);
    return true;
  };

  // "Shop Now" on a product -> Checkout with just that product
  const buyNow = (product, quantity = 1) => {
    setCheckout({
      items: [{ ...product, size: product.size || "50ml", quantity }],
      source: "buyNow",
    });
  };

  const updateCheckoutQuantity = (id, size, quantity) => {
    setCheckout((prev) => ({
      ...prev,
      items:
        quantity <= 0
          ? prev.items.filter((i) => !(i.id === id && i.size === size))
          : prev.items.map((i) =>
              i.id === id && i.size === size ? { ...i, quantity } : i,
            ),
    }));
  };

  // Leave checkout: items that came from the cart go back into it
  const cancelCheckout = () => {
    if (checkout.source === "cart") {
      setCart((prev) => mergeItems(prev, checkout.items));
    }
    setCheckout({ items: [], source: "cart" });
  };

  const checkoutSubtotal = checkout.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const placeOrder = (details) => {
    const shipping = checkoutSubtotal >= 100 || checkoutSubtotal === 0 ? 0 : 6;
    const order = {
      id: `QTR-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      items: checkout.items,
      subtotal: checkoutSubtotal,
      shipping,
      total: checkoutSubtotal + shipping,
      details,
    };
    setOrders((prev) => [order, ...prev]);
    setCheckout({ items: [], source: "cart" });
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        // checkout
        checkoutItems: checkout.items,
        checkoutSource: checkout.source,
        checkoutSubtotal,
        checkoutFromCart,
        buyNow,
        updateCheckoutQuantity,
        cancelCheckout,
        placeOrder,
        orders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
