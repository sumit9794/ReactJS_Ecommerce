import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/userContext";
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Paper, Stack } from "@mui/material";
import axios from "axios";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          You must be logged in to view this page.
        </Typography>
      </Box>
    );
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);

  // Function to load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    // 1️⃣ Load Razorpay script
    const res = await loadRazorpayScript();
      const token = localStorage.getItem("token"); // get JWT from localStorage
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // 2️⃣ Create order in backend
   

      const orderRes = await axios.post(
        "http://localhost:5001/api/auth/create-order",
        {
          amount: totalAmount,
          currency: "INR",
          cart: cart,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // <-- Send token here
          },
        }
      );

      const { id: razorpay_order_id, amount, currency } = orderRes.data;

      // 3️⃣ Open Razorpay payment popup
      const options = {
        key: "rzp_test_Rhs67qvs6REEym",
       // key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Put your key_id here or in .env
        amount: amount,
        currency: currency,
        name: "MyStore",
        description: "Ecommerce Purchase",
        order_id: razorpay_order_id,
        handler: async function (response) {
          // 4️⃣ Verify payment in backend
          await axios.post("http://localhost:5001/api/auth/verify-payment", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
          });
          alert("Payment Successful!");
          // Optionally redirect to order confirmation page
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#1976d2" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ display: "flex", flexDirection: "column", boxShadow: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image || "/placeholder.jpg"}
                alt={item.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">
                    ${item.price} x {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ padding: 3, marginTop: 3, borderRadius: 2, boxShadow: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>Total</Typography>
          <Typography variant="h5" fontWeight={700}>${totalAmount}</Typography>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, width: "100%" }}
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </Button>
      </Paper>
    </Box>
  );
}
