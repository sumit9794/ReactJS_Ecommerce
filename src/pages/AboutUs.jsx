import React from "react";
import { Container, Typography, Box, Grid, Avatar, Paper } from "@mui/material";

const teamMembers = [
  {
    name: "Sumit Singh",
    role: "Founder & CEO",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Anita Sharma",
    role: "Head of Marketing",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Rahul Kumar",
    role: "Lead Developer",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function AboutUs() {
  return (
    <Container sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={8}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          At MyStore, we are passionate about delivering the best products and services
          to our customers. Our mission is to make shopping easy, enjoyable, and reliable.
        </Typography>
      </Box>

      {/* Team Section */}
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Company Story Section */}
      <Box mt={8}>
        <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
          Our Story
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth={800} mx="auto">
          Founded in 2025, MyStore started with a vision to provide high-quality products
          at affordable prices. Our team works tirelessly to source the best items and
          deliver them straight to your doorstep. Customer satisfaction is at the heart of
          everything we do.
        </Typography>
      </Box>
    </Container>
  );
}
