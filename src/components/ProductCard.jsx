import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; // ✅ named import
import { Button, Card, CardMedia, CardContent, Typography, CardActions } from "@mui/material";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext); // ✅ works now

  const handleAddToCart = () => {
    //alert('test')
    addToCart({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
    alert('Product Added to Cart Successfully...!');
  };

  return (
    <Card sx={{ maxWidth: 220, mx: "auto", "&:hover": { boxShadow: 6, transform: "scale(1.05)" } }}>
      <CardMedia component="img" height="180" image={product.image} alt={product.name} />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">₹{product.price}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
