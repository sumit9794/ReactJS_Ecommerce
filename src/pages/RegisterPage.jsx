import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        //alert('test');
    e.preventDefault();

    if (!name || !email || !password || !mobile) {
        alert("Please fill all fields!");
        return;
    }

    setLoading(true);

    try {
        const res = await axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        mobile,
        password,
        });

        // Save JWT token in localStorage
        localStorage.setItem("token", res.data.token);

        alert("Registration successful! Redirecting to checkout...");

        // Redirect to checkout page
        navigate("/checkout");
    } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
        alert(error.response.data.message || "Registration failed!");
        } else {
        alert("Registration failed! Try again.");
        }
    } finally {
        setLoading(false);
    }
    };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f7fa",
        p: 4,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400, borderRadius: 4, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" fontWeight={700} mb={3} textAlign="center">
            Register
          </Typography>

          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
             <TextField
              fullWidth
              label="Mobile"
              type="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontSize: "1rem", borderRadius: 3 }}
              disabled={loading} onClick={()=>handleRegister()}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </form>

          <Typography
        mt={2}
        variant="body2"
        color="text.secondary"
        textAlign="center"
        >
        Already have an account?{" "}
        <Box
            component="span"
            sx={{
            color: "primary.main",
            fontWeight: 600,
            textDecoration: "underline",
            cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
        >
            Log in
        </Box>
        </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}
