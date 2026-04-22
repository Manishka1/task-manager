import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Landing from './components/Landing';   // ✅ ADD THIS
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

export default function AppRouter() {
  return (
    <BrowserRouter>

      {/* ✅ Hide Navbar on landing page */}
      <Route
        path="/"
        render={({ location }) =>
          location.pathname !== "/" ? <Navbar /> : null
        }
      />

      <Switch>

        {/* 🟢 LANDING FIRST */}
        <Route exact path="/" component={Landing} />

        {/* Public */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/pie-chart" component={TaskPieChart} />

        {/* Private */}
        <ProtectedRoute path="/dashboard" component={TaskList} />
        <ProtectedRoute path="/tasks/new" component={TaskForm} />
        <ProtectedRoute path="/tasks/edit/:id" component={TaskForm} />
        <ProtectedRoute path="/tasks/:id" component={TaskDetail} />

        {/* Admin */}
        <ProtectedRoute path="/users" component={UsersList} />

        {/* 404 */}
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />

      </Switch>

    </BrowserRouter>
  );
}