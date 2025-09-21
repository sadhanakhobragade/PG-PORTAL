import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TenantsTable({ tenants = [], onEdit = () => {}, onDelete = () => {} }) {
  if (!tenants.length) {
    return <Typography sx={{ p: 2 }}>No tenants found.</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Room</TableCell>
          <TableCell>Check-in</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tenants.map((t) => {
          const id = t._id || t.id;
          return (
            <TableRow key={id}>
              <TableCell>{t.name || t.fullName || t.email}</TableCell>
              <TableCell>{t.email}</TableCell>
              <TableCell>{t.phone}</TableCell>
              <TableCell>{t.room || '-'}</TableCell>
              <TableCell>{t.checkIn ? new Date(t.checkIn).toLocaleDateString() : '-'}</TableCell>
              <TableCell>
                <IconButton size="small" onClick={() => onEdit(t)} aria-label="edit">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(id)} aria-label="delete">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
