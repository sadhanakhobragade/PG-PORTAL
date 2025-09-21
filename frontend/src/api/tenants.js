// frontend/src/api/tenants.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/tenants"; // backend tenants route

// Get all tenants (owner only)
export const fetchTenants = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create tenant
export const createTenant = async (tenantData, token) => {
  const res = await axios.post(API_URL, tenantData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update tenant
export const updateTenant = async (id, tenantData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, tenantData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete tenant
export const deleteTenant = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};



