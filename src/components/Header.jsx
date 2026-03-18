import React from 'react'
import '../assets/style/Header.css';

const Header = () => {
  return (
    <header>
      <h1>ForneCrud</h1>
      <nav id='nav-bar'>
        <a href="/">Início</a>
        <a href="/cadastrar">Cadastrar</a>
      </nav>
    </header>
  )
}

export default Header
