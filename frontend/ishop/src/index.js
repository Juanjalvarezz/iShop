import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import Articles from './components/Articles';
import Background from './components/background';
import Login from './components/login'; 
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Admin from './components/Router'; 
import Perfil from './components/Perfil';
import Favoritos from './components/Favoritos';
import Users from './components/Users'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/favoritos' element={<Favoritos />} />
        <Route path='/users' element={<Users/>} /> 
      </Routes>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
      <Background>
        <Router>
          <App />
        </Router>
      </Background>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
