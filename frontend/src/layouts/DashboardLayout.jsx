// src/layouts/DashboardLayout.jsx
import React from "react";
import { Box, CssBaseline, Toolbar, Container } from "@mui/material";
import NavBar from "../components/NavBar"; // ✅ use correct file name

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container>{children}</Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

