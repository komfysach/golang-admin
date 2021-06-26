import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Nav from './components/Nav';
import Register from './pages/Register';
import { BrowserRouter, Route } from "react-router-dom";
import Login from './pages/Login';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    (
      async () => {
        try {
          const response = await axios.get('user');
          const user = response.data;

          setUser(user);
        } catch (e) {
          setUser(null);
        }

      }
    )();
  }, [login])
  return (
    <div className="App">
      <BrowserRouter>
        <Nav user={user} setLogin={() => setLogin(false)} />
        <Route path={'/'} exact component={Dashboard} />
        <Route path={'/users'} component={Users} />
        <Route path={'/login'} component={() => <Login setLogin={() => setLogin(true)} />} />
        <Route path={'/register'} component={Register} />


      </BrowserRouter>
    </div>
  );
}

export default App;
