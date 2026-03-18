import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './assets/style/Form.css';

const Form = () => {
  const navigate = useNavigate();

  const [dados, setDados] = useState({
    Empresa: '',
    CNPJ: '',
    Telefone: '',
    Email: '',
    Categoria: '',
  });

  const handleChange = e => {
    setDados({...dados, [e.target.name]: e.target.value});
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    try {

      let empresasExistentes = await fetch('https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe');
      empresasExistentes = await empresasExistentes.json();
    
      let cnpjExistente = false;
      empresasExistentes.forEach(empresa => {
        if (empresa.CNPJ === dados.CNPJ) {
          cnpjExistente = true;
          return;
        }
      });

      if (!cnpjExistente) {
        const res = await fetch('https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (res.ok) {
        navigate('/');
      }
    } else {
      console.log('CNPJ já cadastrado');
    }

  } catch (err) {
    console.error(err);
  }
  }

  return (
    <form action="/" method='POST' id='form-container' onSubmit={handleSubmit}>
      <label htmlFor="Empresa">
        Nome da empresa    
      </label>
      <br />
      <input type="text" id='empresa' name='Empresa' onChange={handleChange} />
      <br />

      <label htmlFor="CNPJ">
        CNPJ
      </label>
      <br />
      <input type="text" id='cnpj' name='CNPJ' onChange={handleChange} />
      <br />

      <label htmlFor="Telefone">
        Telefone
      </label>
      <br />
      <input type="tel" id='telefone' name='Telefone' onChange={handleChange} />
      <br />

      <label htmlFor="Email">
        Email
      </label>
      <br />
      <input type="email" id='email' name='Email' onChange={handleChange} />
      <br />

      <label htmlFor="Categoria">Categoria</label>
      <br />
      <select name="Categoria" id="categoria" onChange={handleChange}>
        <option>Escolha sua categoria</option>
        <option value="Software">Software</option>
        <option value="Hardware">Hardware</option>
        <option value="Serviços">Serviços</option>
      </select>

      <br />

      <button> 
        Enviar
      </button>
    </form>
  )
}

export default Form
