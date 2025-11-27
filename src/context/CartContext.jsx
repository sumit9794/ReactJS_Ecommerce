import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);  // To track loading state
  const [error, setError] = useState(null);  // To track errors

  // Function to fetch the cart
  const fetchCart = async () => {
    setLoading(true);
    setError(null);  // Reset error before trying a new request
    try {
      const res = await axios.get("http://localhost:5001/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,  // Add token if needed
        },
      });
      setCart(res.data);
    } catch (err) {
      setError("Failed to fetch cart. Please try again.");
    } finally {
      setLoading(false);  // End loading regardless of success or failure
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);  // Fetch cart only on initial load

  // Function to add item to cart
  const addToCart = async (product) => {
    try {
      const res = await axios.post("http://localhost:5001/api/cart", product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,  // Add token if needed
        },
      });
      setCart(res.data);
    } catch (err) {
      setError("Failed to add item to cart. Please try again.");
    }
  };

  // Function to remove item from cart
  const removeFromCart = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5001/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,  // Add token if needed
        },
      });
      setCart(res.data);
    } catch (err) {
      setError("Failed to remove item from cart. Please try again.");
    }
  };

  // Function to update quantity (either increase or decrease)
  const updateQuantity = async (id, type) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/cart/${id}/${type}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,  // Add token if needed
          },
        }
      );
      setCart(res.data);
    } catch (err) {
      setError("Failed to update quantity. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
