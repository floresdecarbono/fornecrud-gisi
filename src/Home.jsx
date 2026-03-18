import React, { useEffect, useState } from 'react'
import './assets/style/Home.css';
import FornecedoresTable from './components/FornecedoresTable';

const Home = () => {

  const [dados, setDados] = useState();

  const getData = async () => {
    try {
      const res = await fetch('https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe');
      const dados = await res.json();
      console.log(dados);
      setDados(dados);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 id='home-title'>Home</h1>
      <div id='home-container'><br />
        <FornecedoresTable dados={dados} />
      </div>
    </>
  )
}

export default Home
