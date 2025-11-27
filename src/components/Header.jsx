import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(UserContext); // Only need user and logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            MyStore
          </Link>
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About Us</Button>
          <Button color="inherit" component={Link} to="/products">Products</Button>

          <IconButton color="inherit" component={Link} to="/cart" sx={{ ml: 2 }}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {user ? (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Hello, {user.name}
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
              sx={{ ml: 2 }}
            >
              Login
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem component={Link} to="/" onClick={() => setAnchorEl(null)}>Home</MenuItem>
            <MenuItem component={Link} to="/about" onClick={() => setAnchorEl(null)}>About Us</MenuItem>
            <MenuItem component={Link} to="/products" onClick={() => setAnchorEl(null)}>Products</MenuItem>
            <MenuItem component={Link} to="/cart" onClick={() => setAnchorEl(null)}>Cart</MenuItem>

            {user ? (
              <MenuItem onClick={() => { handleLogout(); setAnchorEl(null); }}>
                Logout ({user.name})
              </MenuItem>
            ) : (
              <MenuItem component={Link} to="/login" onClick={() => setAnchorEl(null)}>
                Login
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
