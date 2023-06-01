import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Diagnosis from './pages/Diagnosis/Diagnosis';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import DogRegister from './pages/DogRegister/DogRegister';
import Tutorial from './pages/Tutorial/Tutorial';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={ <Menu /> } />
        <Route path="diagnosis" element={ <Diagnosis /> } />
        <Route path="register" element={ <Register /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="dogregister" element={ <DogRegister /> } />
        <Route path="home" element={ <Home /> } />
        <Route path="tutorial" element={ <Tutorial /> } />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
