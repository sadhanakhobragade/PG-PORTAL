// src/pages/TenantDashboard.jsx
import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Container, Paper, Typography } from "@mui/material";

export default function TenantDashboard() {
  return (
    <DashboardLayout>
      <Container>
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h5">Tenant Dashboard</Typography>
          <Typography sx={{ mt: 1 }}>Tenant-specific view.</Typography>
        </Paper>
      </Container>
    </DashboardLayout>
  );
}
