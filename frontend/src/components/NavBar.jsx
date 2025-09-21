import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="fixed" color="primary" sx={{ boxShadow: 3 }}>
      <Toolbar>
        <Typography component={RouterLink} to="/" sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1, fontWeight: 'bold' }}>
          PG-PORTAL
        </Typography>

        {user ? (
          <>
            {user.role === "owner" ? (
              <>
                <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
                <Button color="inherit" component={RouterLink} to="/tenants">Tenants</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/tenant/dashboard">Dashboard</Button>
              </>
            )}
            <Typography sx={{ mx: 2 }}>{user.name}</Typography>
            <Button color="secondary" variant="contained" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
            <Button color="secondary" variant="contained" component={RouterLink} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
