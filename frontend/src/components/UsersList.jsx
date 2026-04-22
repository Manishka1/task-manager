import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/users/usersSlice';

export default function UsersList() {
  const dispatch = useDispatch();
  const { list = [] } = useSelector(s => s.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Box
      p={3}
      sx={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at 20% 20%, rgba(171,0,255,0.15), transparent 40%),
          radial-gradient(circle at 80% 30%, rgba(171,0,255,0.1), transparent 50%),
          #0b040d
        `,
        color: "#fff"
      }}
    >
      <Paper
        sx={{
          p: 3,
          background: "rgba(171,0,255,0.08)",
          border: "1px solid rgba(171,0,255,0.25)",
          backdropFilter: "blur(14px)",
          borderRadius: "16px"
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          mb={3}
          sx={{
            fontWeight: 600,
            background: "linear-gradient(90deg,#7f00ff,#e100ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          User Management
        </Typography>

        {/* Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#aaa" }}>Email</TableCell>
              <TableCell sx={{ color: "#aaa" }}>Role</TableCell>
              <TableCell align="right" sx={{ color: "#aaa" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.map(u => (
              <TableRow
                key={u._id}
                sx={{
                  transition: "all 0.2s ease",
                  '&:hover': {
                    background: "rgba(255,255,255,0.03)"
                  }
                }}
              >
                {/* Email */}
                <TableCell sx={{ color: "#fff" }}>
                  {u.email}
                </TableCell>

                {/* Role */}
                <TableCell>
                  <Chip
                    label={u.role}
                    size="small"
                    sx={{
                      background:
                        u.role === "admin"
                          ? "#ab00ff"
                          : "rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontWeight: 500,
                      textTransform: "capitalize"
                    }}
                  />
                </TableCell>

                {/* Actions */}
                <TableCell align="right">
                  <Button
                    onClick={() => dispatch(deleteUser(u._id))}
                    sx={{
                      color: "#ff4d4f",
                      fontWeight: 500,
                      '&:hover': {
                        color: "#ff1a1a",
                        background: "rgba(255,0,0,0.08)"
                      }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {list.length === 0 && (
          <Box textAlign="center" py={4}>
            <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
              No users found
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}