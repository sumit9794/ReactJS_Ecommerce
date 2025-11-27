import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/userContext";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CartPage() {
  const { cart, fetchCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(UserContext); // Access user context
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the cart data once when the component is mounted
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      await fetchCart(); // Fetch cart data from the backend
      setLoading(false);
    };

    loadCart();
  }, []); // Empty dependency array to only fetch once when component mounts

  // Decrease quantity of an item
  const decreaseQty = async (id) => {
    await axios.put(`http://localhost:5001/api/cart/${id}/decrease`);
    // Instead of refetching the cart, update locally or notify the CartContext to update the cart
    await fetchCart(); // Optionally, refetch if you want updated cart from the server
  };

  // Increase quantity of an item
  const increaseQty = async (id) => {
    await axios.put(`http://localhost:5001/api/cart/${id}/increase`);
    // Same here, update locally or refetch
    await fetchCart(); // Optionally, refetch if you want updated cart from the server
  };

  // Remove item from cart
  const removeItem = async (id) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      await removeFromCart(id);
      await fetchCart(); // Refetch cart after removing the item (could be optimized with local update)
    }
  };

  // Handle checkout
    const handleCheckout = async () => {
    // Ensure the user is logged in before proceeding with checkout
    if (!user) {
      alert("You must log in first!");
      navigate("/login"); // Redirect to login if the user is not logged in
      return;
    }

    // Get the token from localStorage (ensure it exists)
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found. Please log in again.");
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    try {
      // Make the API call to the backend with cart data and JWT token in the headers
      const res = await axios.post(
        "http://localhost:5001/api/auth/checkout", // Backend API endpoint
        { cart },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the JWT token
          },
        }
      );

      // Handle success response from the backend
      alert(res.data.message);
      navigate("/checkout"); // Redirect to a success page or confirmation page
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
      navigate("/"); // Redirect to home page if checkout fails
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 900, borderRadius: 4, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={700} mb={3}>
            Your Cart
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {loading && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {!loading && cart.length === 0 && (
            <Typography color="text.secondary" textAlign="center" py={4}>
              Your cart is empty. Shop now!
            </Typography>
          )}

          {cart.map((item) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={item.id}
              sx={{
                p: 2,
                borderRadius: 2,
                mb: 2,
                bgcolor: "#ffffff",
                boxShadow: 1,
              }}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">${item.price}</Typography>
              </Grid>

              <Grid item xs={12} sm={3} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton color="primary" onClick={() => decreaseQty(item.id)}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton color="primary" onClick={() => increaseQty(item.id)}>
                  <AddIcon />
                </IconButton>
              </Grid>

              <Grid item xs={12} sm={3} sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeItem(item.id)}
                  sx={{
                    mt: 1,
                    textTransform: "none",
                    borderRadius: 3,
                    px: 3,
                    py: 0.7,
                    fontWeight: 600,
                  }}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          ))}

          {cart.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" fontWeight={700}>
                  $
                  {cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.8, fontSize: "1.1rem", borderRadius: 3 }}
                onClick={handleCheckout} // Checkout only available if logged in
              >
                Checkout
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
