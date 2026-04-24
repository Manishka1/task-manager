import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  MenuItem,
  Select
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTask, updateTask } from '../features/tasks/tasksSlice';
import { useParams, useHistory } from 'react-router-dom';

export default function TaskDetail() {

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { task } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);

  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(fetchTask(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  if (!task) return null;

  const handleStatusUpdate = async () => {

    await dispatch(updateTask({
      id: task._id,
      data: { status }
    }));
    history.push('/');
  };

  return (
    <Box p={3} display="flex" justifyContent="center">

      <Paper sx={{ p:4, width:600 }}>

        <Typography variant="h4" gutterBottom>
          {task.title}
        </Typography>

        <Typography variant="body1" mb={2}>
          {task.description}
        </Typography>

        <Typography variant="body2" mb={1}>
          Priority: {task.priority}
        </Typography>

        <Typography variant="body2" mb={2}>
          Due Date: {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : '—'}
        </Typography>

        <Divider sx={{ my:2 }} />

        <Typography variant="h6">
          Status
        </Typography>

        {user?.role === 'admin' ? (

          <Box mt={1} display="flex" gap={2}>

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
              variant="contained"
              onClick={handleStatusUpdate}
            >
              Update
            </Button>

          </Box>

        ) : (

          <Typography mt={1}>
            {task.status}
          </Typography>

        )}

        <Divider sx={{ my:2 }} />

        <Typography variant="h6">
          Documents
        </Typography>

        {task.documents?.length ? (

          task.documents.map(doc => {

            const filename = doc.path.split('/').pop();

            return (
              <Box key={doc._id} mt={1}>

                <Button
                  variant="outlined"
                  onClick={() => {
                    window.open(
                      `${import.meta.env.VITE_API_URL.replace('/api','')}/uploads/${filename}`,
                      '_blank'
                    );
                  }}
                >
                  Download {doc.filename}
                </Button>

              </Box>
            );
          })

        ) : (

          <Typography mt={1}>
            No documents uploaded
          </Typography>

        )}

      </Paper>

    </Box>
  );
}