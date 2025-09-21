import React, { useEffect, useState } from 'react';
import { Container, Paper, Box, Typography, Button, CircularProgress } from '@mui/material';
import DashboardLayout from '../layouts/DashboardLayout';
import TenantsTable from '../components/TenantsTable';
import AddEditTenantDialog from '../components/AddEditTenantDialog';
import { fetchTenants, deleteTenant } from '../api/tenants';

export default function TenantsPage() {


  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchTenants();
      setTenants(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load tenants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = () => { setSelectedTenant(null); setOpenDialog(true); };
  const handleEdit = (tenant) => { setSelectedTenant(tenant); setOpenDialog(true); };

  const handleDelete = async (id) => {
    if (!confirm('Delete this tenant?')) return;
    try {
      await deleteTenant(id);
      load();
    } catch (err) {
      alert(err?.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Tenants</Typography>
            <Button variant="contained" onClick={handleAdd}>Add Tenant</Button>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TenantsTable tenants={tenants} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </Paper>
      </Container>

      <AddEditTenantDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        tenant={selectedTenant}
        onSuccess={load}
      />
    </DashboardLayout>
  );
}
