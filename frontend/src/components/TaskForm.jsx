import React, { useEffect, useState } from 'react';
import {
  Box, Paper, TextField, Button, Typography,
  MenuItem, FormControl, InputLabel, Select, Alert
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTask,
  updateTask,
  fetchTask,
  deleteTask
} from '../features/tasks/tasksSlice';
import { fetchUsers } from '../features/users/usersSlice';
import { useHistory, useParams } from 'react-router-dom';

export default function TaskForm() {
  const dispatch = useDispatch();
  const history  = useHistory();
  const { id }   = useParams();
  const isEdit   = Boolean(id);

  const { task, error } = useSelector(s => s.tasks);
  const { list: users } = useSelector(s => s.users);

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 3,
    dueDate: null,
    assignedTo: '',
    documents: []
  });

  // load users + (if editing) existing task
  useEffect(() => {
    dispatch(fetchUsers());
    if (isEdit) dispatch(fetchTask(id));
  }, [dispatch, id, isEdit]);

  // when the task arrives, prefill
  useEffect(() => {
    if (isEdit && task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        priority: task.priority || 3,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        assignedTo: task.assignedTo || '',
        documents: []
      });
    }
  }, [task, isEdit]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleDateChange = date => {
    setForm(f => ({ ...f, dueDate: date }));
  };

  const handleFiles = e => {
    setForm(f => ({ ...f, documents: e.target.files }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'documents') {
        Array.from(v).forEach(file => data.append('documents', file));
      } else if (v !== null) {
        data.append(k, v);
      }
    });
    if (isEdit) {
      await dispatch(updateTask({ id, data }));
    } else {
      await dispatch(createTask(data));
    }
    history.push('/');
  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" mb={2}>
          {isEdit ? 'Edit Task' : 'New Task'}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title" name="title"
            fullWidth margin="normal"
            value={form.title} onChange={handleChange}
            required
          />

          <TextField
            label="Description" name="description"
            fullWidth margin="normal" multiline rows={4}
            value={form.description} onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status" name="status"
              value={form.status} onChange={handleChange}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              label="Priority" name="priority"
              value={form.priority} onChange={handleChange}
            >
              {[1,2,3,4,5].map(n =>
                <MenuItem key={n} value={n}>{n}</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Assign To</InputLabel>
            <Select
              label="Assign To" name="assignedTo"
              value={form.assignedTo} onChange={handleChange}
            >
              {users.map(u =>
                <MenuItem key={u._id} value={u._id}>{u.email}</MenuItem>
              )}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Due Date"
              inputFormat="MM/dd/yyyy"
              value={form.dueDate}
              onChange={handleDateChange}
              renderInput={(params) =>
                <TextField {...params} fullWidth margin="normal" />
              }
            />
          </LocalizationProvider>

          <Button
            variant="outlined"
            component="label"
            sx={{ mt:2 }}
          >
            Upload PDFs
            <input
              type="file"
              name="documents"
              hidden
              multiple
              accept="application/pdf"
              onChange={handleFiles}
            />
          </Button>
          {form.documents.length > 0 &&
            <Typography variant="caption" display="block" mt={1}>
              {form.documents.length} file(s) selected
            </Typography>
          }

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button onClick={()=>history.push('/')} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {isEdit ? 'Update Task' : 'Create Task'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
