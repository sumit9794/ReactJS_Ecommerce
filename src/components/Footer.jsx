import React from "react";
import { Box, Container, Typography, Grid, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              MyStore
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for the latest products. Quality guaranteed.
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Links
            </Typography>
            <Link href="#" color="inherit" display="block" underline="hover">
              Home
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              Products
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              About
            </Link>
            <Link href="#" color="inherit" display="block" underline="hover">
              Contact
            </Link>
          </Grid>

          {/* Social Section */}
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <IconButton color="inherit" href="#">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" href="#">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" href="#">
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} MyStore. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
