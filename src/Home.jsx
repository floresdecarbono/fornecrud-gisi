import React, { useEffect, useState } from 'react'
import './assets/style/Home.css';
import FornecedoresTable from './components/FornecedoresTable';

const Home = () => {
  const [dados, setDados] = useState();

  const getData = async () => {
    try {
      const res = await fetch('https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe');
      const dados = await res.json();
      setDados(dados);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const gerarMuitasEmpresas = async () => {
    const nomes = ['Tech', 'Global', 'Nexus', 'Inova', 'Prime', 'Master', 'Log', 'Eco', 'Digital', 'Sky'];
    const sufixos = ['Solutions', 'Sistemas', 'Brasil', 'Consultoria', 'Group', 'Services', 'Partners', 'Indústria'];
    const categorias = ['Software', 'Hardware', 'Serviços'];
    const ufs = ['SP', 'RJ', 'MG', 'PR', 'SC', 'RS', 'BA', 'PE', 'CE', 'AM'];
    const statusOpcoes = ['Ativo', 'Ativo', 'Inativo'];
    
    const novasEmpresas = [];

    for (let i = 0; i < 5; i++) {
      const nomeBase = nomes[Math.floor(Math.random() * nomes.length)];
      const sufixoBase = sufixos[Math.floor(Math.random() * sufixos.length)];
      const nomeCompleto = `${nomeBase} ${sufixoBase} ${Math.floor(Math.random() * 99)}`;
      const cnpjFake = Math.floor(Math.random() * 90000000000000 + 10000000000000).toString();
      
      novasEmpresas.push({
        Empresa: nomeCompleto,
        CNPJ: cnpjFake,
        Telefone: `(11) 9${Math.floor(Math.random() * 89999999 + 10000000)}`,
        Email: `${nomeBase.toLowerCase()}@empresa.com.br`,
        Categoria: categorias[Math.floor(Math.random() * categorias.length)],
        UF: ufs[Math.floor(Math.random() * ufs.length)], 
        Status: statusOpcoes[Math.floor(Math.random() * statusOpcoes.length)] 
      });
    }

    try {
      const res = await fetch('https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novasEmpresas),
      });

      if (res.ok) {
        alert("5 empresas aleatórias foram adicionadas!");
        getData(); 
      }
    } catch (err) {
      console.error("Erro ao gerar:", err);
    }
  };

  return (
    <div id='home-container'>
      <h1 id='home-title'>Painel de Controle</h1>
      
      <button className="btn-gerar" onClick={gerarMuitasEmpresas}>
        🚀 Gerar 5 Empresas Aleatórias
      </button>

      <FornecedoresTable dados={dados} setDados={setDados} />
    </div>
  )
}

export default Home;