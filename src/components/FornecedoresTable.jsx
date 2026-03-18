import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../assets/style/Table.css';

const FornecedoresTable = ({ dados, setDados }) => {
  const navigate = useNavigate(); 

  async function handleDeletar(cnpj) {
    const confirmar = window.confirm(`Tem certeza que deseja excluir o fornecedor de CNPJ: ${cnpj}?`);
    if (!confirmar) return;

    const index = dados.findIndex(item => item.CNPJ === cnpj);

    if (index !== -1) {
      try {
        const res = await fetch(`https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe/${index}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          const novosDados = dados.filter(item => item.CNPJ !== cnpj);
          setDados(novosDados);
          alert('Fornecedor excluído com sucesso!');
        }
      } catch (err) {
        console.error('Erro ao deletar:', err);
      }
    }
  }

  return (
    <table id='tb-fornecedores'>
      <caption>Listagem de Fornecedores e Localização</caption>
      <thead>
        <tr>
          <th scope='col'>Empresa</th>
          <th scope='col'>CNPJ</th>
          <th scope='col'>UF</th>
          <th scope='col'>Status</th> 
          <th scope='col'>Categoria</th>
          <th scope='col'>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados?.map((row, index) => (
          <tr key={row.CNPJ || index}>
            <th className="company-name">{row.Empresa}</th>
            <td>{row.CNPJ}</td>
            <td className="center-text">{row.UF || '-'}</td>
            <td>
              <span className={`status-badge ${row.Status?.toLowerCase() === 'ativo' ? 'online' : 'offline'}`}>
                {row.Status || 'Ativo'}
              </span>
            </td>
            <td>{row.Categoria}</td>
            <td className="actions-cell">
              <button 
                className="btn-edit" 
                onClick={() => navigate(`/editar/${index}`)}
              >
                Editar
              </button>
              <button 
                className="btn-delete" 
                onClick={() => handleDeletar(row.CNPJ)}
              >
                Deletar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FornecedoresTable;