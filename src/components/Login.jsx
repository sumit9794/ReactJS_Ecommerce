import React, { useState, useContext } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext"; // Import your UserContext

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(UserContext); // Get login function from context

  // Redirect URL
  const redirectTo = new URLSearchParams(location.search).get("redirect") || "/";

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      const { token } = res.data;

      // Use UserContext login to update state immediately
      login(token);

      alert("Login successful!");

      // Redirect after login
      navigate(redirectTo);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Login failed!");
      } else {
        alert("Login failed! Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" mb={3}>
          Login
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2 }}
          fullWidth
          disabled={loading}
        >
          {loading ? "Please wait..." : "Login"}
        </Button>

        <Typography mt={2} variant="body2" color="text.secondary" textAlign="center">
          Don’t have an account?{" "}
          <Box
            component="span"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Box>
        </Typography>
      </Box>
    </Container>
  );
}
