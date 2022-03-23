import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home';
import Guard from './Guard';

function App() {
  return (
    <div className="App">
      <Route path="/login">
        <Login />
      </Route>
      <Guard path="/home" Component={Home}>
      </Guard>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
    </div>
  );
}

export default App;
