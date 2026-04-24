import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './components/Landing'; 
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import UsersList from './components/UsersList';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import TaskPieChart from './components/TaskPieChart';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser } from "./features/auth/authSlice";

export default function AppRouter() {
  const dispatch = useDispatch();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    dispatch(setUser({ token, role: decoded.role }));
  }
}, []);
  return (
    <BrowserRouter>

      <Route
        path="/"
        render={({ location }) =>
          location.pathname !== "/" ? <Navbar /> : null
        }
      />

      <Switch>

        <Route exact path="/" component={Landing} />

       
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/pie-chart" component={TaskPieChart} />

       
        <ProtectedRoute path="/dashboard" component={TaskList} />
        <ProtectedRoute path="/tasks/new" component={TaskForm} />
        <ProtectedRoute path="/tasks/edit/:id" component={TaskForm} />
        <ProtectedRoute path="/tasks/:id" component={TaskDetail} />

        
        <ProtectedRoute path="/users" component={UsersList} />

        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />

      </Switch>

    </BrowserRouter>
  );
}