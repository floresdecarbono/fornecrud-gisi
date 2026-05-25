import React from 'react';
import { Link } from 'react-router-dom'; 
import '../assets/style/Header.css';

const Header = () => {
  return (
    <header>
      <h1>ForneCrud</h1>
      <nav id='nav-bar'>
        <Link to="/">Início</Link>
        <Link to="/cadastrar">Cadastrar</Link>
        <Link to="/dashboards">Dashboards</Link>
      </nav>
    </header>
  );
}

export default Header;