import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './assets/style/Form.css';

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = id !== undefined;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [estados, setEstados] = useState([]); 

  const [dados, setDados] = useState({
    Empresa: '',
    CNPJ: '',
    Telefone: '',
    Email: '',
    Categoria: '',
    UF: '',      
    Status: 'Ativo', 
  });

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(res => res.json())
      .then(data => setEstados(data))
      .catch(err => console.error("Erro ao carregar estados:", err));
  }, []);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      fetch(`https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            setDados(data[0]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, isEditing]);

  const handleChange = e => {
    const { name, value } = e.target;
    if ((name === 'CNPJ' || name === 'Telefone') && /\D/.test(value.at(-1)) && value !== "") return;
    setDados({ ...dados, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!isEditing) {
        const resBusca = await fetch('https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe');
        const empresasExistentes = await resBusca.json();
        const cnpjExistente = empresasExistentes.some(empresa => empresa.CNPJ === dados.CNPJ);

        if (cnpjExistente) {
          setError('Este CNPJ já está cadastrado.');
          setLoading(false);
          return;
        }
      }

      const url = isEditing 
        ? `https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe/${id}`
        : 'https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe';
      
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (res.ok) {
        alert(isEditing ? 'Atualizado com sucesso!' : 'Cadastrado com sucesso!');
        navigate('/');
      }
    } catch (err) {
      setError('Erro na conexão.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <form id='form-container' onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Editar Fornecedor' : 'Cadastrar Novo Fornecedor'}</h2>
        
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>Nome da Empresa</label>
          <input type="text" name='Empresa' value={dados.Empresa} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>CNPJ</label>
          <input type="text" name='CNPJ' value={dados.CNPJ} onChange={handleChange} required maxLength="14" disabled={isEditing} />
        </div>

        <div className="input-group">
          <label>Estado (UF)</label>
          <select name="UF" value={dados.UF} onChange={handleChange} required>
            <option value="">Selecione um Estado</option>
            {estados.map(uf => (
              <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Status de Ativação</label>
          <select name="Status" value={dados.Status} onChange={handleChange} required>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>

        <div className="input-group">
          <label>Telefone</label>
          <input type="tel" name='Telefone' value={dados.Telefone} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>E-mail Corporativo</label>
          <input type="email" name='Email' value={dados.Email} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Categoria</label>
          <select name="Categoria" value={dados.Categoria} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Serviços">Serviços</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar Fornecedor')}
        </button>
      </form>
    </div>
  );
};

export default Form;