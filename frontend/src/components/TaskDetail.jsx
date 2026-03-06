import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  Divider,
  Select,
  MenuItem
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTask, deleteTask, updateTask } from '../features/tasks/tasksSlice';
import { fetchUsers } from '../features/users/usersSlice';
import { useHistory, useParams } from 'react-router-dom';

export default function TaskDetail() {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { task } = useSelector(s => s.tasks);
  const { list: users } = useSelector(s => s.users);
  const { user } = useSelector(s => s.auth);

  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTask(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  if (!task) return <Typography>Loading…</Typography>;

  const assigned = users.find(u => u._id === task.assignedTo);
  const createdBy = users.find(u => u._id === task.createdBy);

  const handleDelete = async () => {
    if (window.confirm('Delete this task?')) {
      await dispatch(deleteTask(task._id));
      history.push('/');
    }
  };

  const handleStatusUpdate = async () => {
    await dispatch(updateTask({
      id: task._id,
      data: { status }
    }));
  };

  return (
    <Box p={3}>
      <Paper sx={{ p:4, maxWidth:600, mx:'auto' }}>

        <Box display="flex" justifyContent="space-between">

          <Typography variant="h5">
            {task.title}
          </Typography>

          {user?.role === 'admin' && (
            <Box>
              <Button
                color="error"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          )}

        </Box>

        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Priority: {task.priority}
        </Typography>

        <Typography variant="body1" mb={2}>
          {task.description}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          Created by: {createdBy?.email || task.createdBy}
        </Typography>

        <Typography variant="body2" color="textSecondary" mb={2}>
          Assigned to: {assigned?.email || task.assignedTo}
        </Typography>

        <Divider sx={{ my:2 }} />

        <Typography variant="h6">Status</Typography>

        {user?.role === 'admin' ? (
          <Box mt={1} mb={2}>

            <Select
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
              size="small"
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>

            <Button
              sx={{ ml:2 }}
              variant="contained"
              onClick={handleStatusUpdate}
            >
              Update
            </Button>

          </Box>
        ) : (
          <Typography>Status: {task.status}</Typography>
        )}

        <Divider sx={{ my:2 }} />

        <Typography variant="h6">Documents</Typography>

        {task.documents?.length ? (

          <List>
            {task.documents.map(doc => (
              <ListItem
                key={doc._id}
                secondaryAction={
                  <Button
                    size="small"
                    onClick={() => {
                      window.open(
                        `${import.meta.env.VITE_API_URL.replace('/api','')}/uploads/${doc.path.split('/').pop()}`,
                        '_blank'
                      );
                    }}
                  >
                    Download
                  </Button>
                }
              >
                {doc.filename}
              </ListItem>
            ))}
          </List>

        ) : (
          <Typography>No documents attached.</Typography>
        )}

      </Paper>
    </Box>
  );
}