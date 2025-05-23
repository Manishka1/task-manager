import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login       from './components/LoginForm';
import Register    from './components/RegisterForm';
import TaskList    from './components/TaskList';
import TaskForm    from './components/TaskForm';
import TaskDetail  from './components/TaskDetail';
import UsersList   from './components/UsersList';
import Navbar      from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound    from './components/NotFound';

export default function AppRouter(){
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        {/* Public */}
        <Route path="/login"    component={Login}/>
        <Route path="/register" component={Register}/>

        {/* Private */}
        <ProtectedRoute exact path="/"            component={TaskList}/>
        <ProtectedRoute       path="/tasks/new"   component={TaskForm}/>
        <ProtectedRoute       path="/tasks/edit/:id" component={TaskForm}/>
        <ProtectedRoute       path="/tasks/:id"   component={TaskDetail}/>

        {/* Admin only (back-end will reject non-admins) */}
        <ProtectedRoute       path="/users"       component={UsersList}/>

        {/* Catch-all */}
        <Route path="/404" component={NotFound}/>
        <Redirect to="/404"/>
      </Switch>
    </BrowserRouter>
  );
}