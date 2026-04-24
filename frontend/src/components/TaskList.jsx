import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/tasksSlice';
import { useHistory } from 'react-router-dom';
import { selectUserRole } from '../features/auth/authSlice';

export default function TaskList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tasks = [], total, loading, error } = useSelector(state => state.tasks);
  const userRole = useSelector(selectUserRole) || '';

  const [params, setParams] = useState({
    status: '',
    priority: '',
    page: 1,
    size: 6
  });

  useEffect(() => {
    dispatch(fetchTasks(params));
  }, [dispatch, params]);

  const handleFilterChange = (field) => (evt) => {
    setParams({ ...params, [field]: evt.target.value, page: 1 });
  };

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

     
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Box display="flex" gap={2} flexWrap="wrap">

          <FormControl
            sx={{
              minWidth: 140,
              background: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
              backdropFilter: "blur(10px)"
            }}
            size="small"
          >
            <InputLabel sx={{ color: "#aaa" }}>Status</InputLabel>
            <Select
              value={params.status}
              label="Status"
              onChange={handleFilterChange('status')}
              sx={{ color: "#fff" }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{
              minWidth: 140,
              background: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
              backdropFilter: "blur(10px)"
            }}
            size="small"
          >
            <InputLabel sx={{ color: "#aaa" }}>Priority</InputLabel>
            <Select
              value={params.priority}
              label="Priority"
              onChange={handleFilterChange('priority')}
              sx={{ color: "#fff" }}
            >
              <MenuItem value="">All</MenuItem>
              {[1, 2, 3, 4, 5].map(n => (
                <MenuItem key={n} value={n}>
                  <Chip
                    label={n}
                    size="small"
                    sx={{
                      background: "rgba(255,255,255,0.1)",
                      color: "#000"
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {userRole === 'admin' && (
          <Button
            onClick={() => history.push('/tasks/new')}
            sx={{
              background: "linear-gradient(90deg,#7f00ff,#e100ff)",
              color: "#fff",
              borderRadius: "10px",
              px: 3,
              '&:hover': { opacity: 0.9 }
            }}
          >
            + New Task
          </Button>
        )}
      </Box>

     
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

     
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress sx={{ color: "#ab00ff" }} />
        </Box>
      ) : (
        <>
        
          <Grid container spacing={2}>
            {tasks.map(task => (
              <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card
  sx={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "rgba(171,0,255,0.08)", 
    border: "1px solid rgba(171,0,255,0.25)",
    backdropFilter: "blur(14px)",
    borderRadius: "16px",
    transition: "all 0.3s ease",
    '&:hover': {
      transform: "translateY(-6px)",
      boxShadow: "0 0 40px rgba(171,0,255,0.35)"
    }
  }}
>
                  <CardContent sx={{ flexGrow: 1, color: "rgba(255,255,255,255)"}}>
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>

                    <Typography
                      sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}
                    >
                      {task.description?.substring(0, 100)}
                      {task.description?.length > 100 ? '...' : ''}
                    </Typography>

                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Chip
                        label={task.status}
                        size="small"
                        sx={{
                          background: "rgba(171,0,255,0.15)",
                          color: "#ddbbf1",
                          border: "1px solid rgba(171,0,255,0.3)"
                        }}
                      />

                      <Chip
                        label={`P${task.priority}`}
                        size="small"
                        sx={{
                          background: "rgba(255,255,255,0.08)",
                          color: "#ccc",
                          border: "1px solid rgba(255,255,255,0.1)"
                        }}
                      />
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 1, textAlign: 'right', borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <Button
                      size="small"
                      onClick={() => history.push(`/tasks/${task._id}`)}
                      sx={{
                        color: "#ab00ff",
                        '&:hover': { color: "#e100ff" }
                      }}
                    >
                      View →
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

         
          {!loading && tasks.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
                No tasks found
              </Typography>
            </Box>
          )}

         
          {tasks.length > 0 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(total / params.size)}
                page={params.page}
                onChange={(e, p) => setParams({ ...params, page: p })}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: "#fff"
                  },
                  '& .Mui-selected': {
                    background: "linear-gradient(90deg,#7f00ff,#e100ff)"
                  }
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}