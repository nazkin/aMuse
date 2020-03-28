import React from 'react';
import Auth from  './pages/Auth/Auth';
import PostAuth from './pages/PostAuth/PostAuth';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="main">
     <BrowserRouter>
        <Route path="/" exact component={Auth} />
        <Route path="/home" component={PostAuth} />
     </BrowserRouter>
    </div>
  );
}

export default App;
