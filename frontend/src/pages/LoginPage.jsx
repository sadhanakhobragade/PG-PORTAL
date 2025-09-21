// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { loginUser } from "../api/auth";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await loginUser(form); // backend returns { token, user: { id, name, email, role } }
      const { token, user } = res.data;
      // pass flattened object to AuthContext.login
      login({ token, ...user });
      // redirect by role
      if (user.role === "owner") navigate("/dashboard");
      else navigate("/tenant/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        {err && <Typography color="error">{err}</Typography>}
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth margin="normal" required />
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Sign in</Button>
      </Box>
    </Container>
  );
}
