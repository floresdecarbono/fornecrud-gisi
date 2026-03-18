import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import './assets/style/App.css';
import Header from './components/Header.jsx';
import Form from './Form.jsx';
import Home from './Home.jsx';
import Dashboards from './components/Dashboard.jsx';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar" element={<Form />} />
          <Route path="/editar/:id" element={<Form />} />
          <Route path="/dashboards" element={<Dashboards />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;