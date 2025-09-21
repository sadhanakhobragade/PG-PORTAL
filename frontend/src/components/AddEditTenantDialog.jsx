import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { createTenant, updateTenant } from "../api/tenants";

export default function AddEditTenantDialog({ open, onClose, tenant, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    room: "",
    checkInDate: "",
  });

  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name || "",
        email: tenant.email || "",
        phone: tenant.phone || "",
        room: tenant.room || "",
        checkInDate: tenant.checkInDate ? tenant.checkInDate.substring(0, 10) : "",
      });
    } else {
      setFormData({ name: "", email: "", phone: "", room: "", checkInDate: "" });
    }
  }, [tenant]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (tenant) {
        await updateTenant(tenant._id, formData);
      } else {
        await createTenant(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving tenant:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{tenant ? "Edit Tenant" : "Add Tenant"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Room"
              name="room"
              fullWidth
              value={formData.room}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Check-in Date"
              name="checkInDate"
              type="date"
              fullWidth
              value={formData.checkInDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {tenant ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
