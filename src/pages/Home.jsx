import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Home() {
  return (
    <Container sx={{ py: 5 }}>
      {/* Page Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
      >
        Latest Products
      </Typography>

      {/* Product Grid */}
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid
            item
            xs={12}      // 1 column on extra small devices
            sm={6}       // 2 columns on small devices
            md={4}       // 3 columns on medium devices
            lg={2.4}     // 5 columns on large devices (12/5 = 2.4)
            key={product.id}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
