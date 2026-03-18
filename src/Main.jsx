import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './assets/style/Main.css';
import Form from './Form';
import Home from './Home';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cadastrar' element={<Form />}/>
      </Routes>
    </main>
  )
}

export default Main
