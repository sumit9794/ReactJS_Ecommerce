import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard"; // your card component
import { products } from "../data/products"; // your product data

export default function Products() {
  return (
    <Container sx={{ py: 6 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        All Products
      </Typography>

      {/* Product Grid */}
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid
            item
            xs={12}       // 1 per row on mobile
            sm={6}        // 2 per row on small screens
            md={4}        // 3 per row on medium screens
            lg={2.4}      // 5 per row on large screens
            key={product.id}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
