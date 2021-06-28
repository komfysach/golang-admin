import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';

import Register from './pages/Register';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './pages/Login';
import Roles from './pages/roles/Roles';
import RoleCreate from './pages/roles/RoleCreate';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/'} exact component={Dashboard} />
        <Route path={'/register'} component={Register} />
        <Route path={'/login'} component={Login} />
        <Route path={'/users'} exact component={Users} />
        <Route path={'/users/create'} component={UserCreate} />
        <Route path={'/users/:id/edit'} component={UserEdit} />
        <Route path={'/roles'} exact component={Roles} />
        <Route path={'/roles/create'} component={RoleCreate} />
      </BrowserRouter>
    </div>
  );
}

export default App;
