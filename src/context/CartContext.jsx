import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  const addToCart = useCallback((product, quantity, extras = []) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.extras) === JSON.stringify(extras),
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity, extras }];
    });
  }, []);

  const removeFromCart = useCallback((index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index, quantity) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((_, i) => i !== index);
      const next = [...prev];
      next[index] = { ...next[index], quantity };
      return next;
    });
  }, []);

  const toggleFavorite = useCallback((productId) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartTotal = useMemo(
    () =>
      items.reduce((total, item) => {
        const extrasTotal = item.extras.reduce((sum, ex) => sum + ex.price, 0);
        return total + (item.product.price + extrasTotal) * item.quantity;
      }, 0),
    [items],
  );

  const cartCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items],
  );

  const deliveryFee = items.length > 0 ? 35000 : 0;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        deliveryFee,
        finalTotal,
        favorites,
        toggleFavorite,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
