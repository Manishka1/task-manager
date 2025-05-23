import React, { useEffect } from 'react';
import {
  Box, Paper, Table, TableHead,
  TableRow, TableCell, TableBody, Button, Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/users/usersSlice';

export default function UsersList() {
  const dispatch = useDispatch();
  const { list } = useSelector(s => s.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Box p={3}>
      <Paper sx={{ p:2 }}>
        <Typography variant="h6" mb={2}>User Management</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(u => (
              <TableRow key={u._id}>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell align="right">
                  <Button
                    color="error"
                    onClick={() => dispatch(deleteUser(u._id))}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}