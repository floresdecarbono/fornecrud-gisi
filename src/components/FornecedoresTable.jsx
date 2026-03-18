import React from 'react'
import '../assets/style/Table.css';

const FornecedoresTable = ({ dados }) => {

  function handleDeletar(cnpj) {
    for (let i = 0; i < dados.length; i++) {
      console.log(dados[i]);
      if (dados[i].CNPJ === cnpj) {
        fetch(`https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe/${i}`, {
          method: 'DELETE',
        })
        .then(console.log('DELETADO'))
        .catch(err => console.error('ERROR: ', err));

        break;
      }
    }  }

  return (
    <table id='tb-fornecedores'>
      <caption>Fornecedores cadastrados e seus dados</caption>
      
      <thead>
        <tr>
          <th scope='col' className='th-title'>Empresa</th>
          <th scope='col' className='th-title'>CNPJ</th>
          <th scope='col' className='th-title'>Telefone</th>
          <th scope='col' className='th-title'>Email</th>
          <th scope='col' className='th-title'>Categoria</th>
          <th scope='col' className='th-title'>Ações</th>
        </tr>
      </thead>
      <tbody>
        {dados?.map(row => {
          let empresa = row.Empresa;
          return (
            <tr id={`${empresa}-row`} key={`${empresa}-row`}>
            <th id={`${empresa}-name`} key={`${empresa}-name`}>{empresa}</th>
            <td id={`${empresa}-cnpj`} key={`${empresa}-cnpj`}>{row.CNPJ}</td>
            <td id={`${empresa}-telefone`} key={`${empresa}-telefone`}>{row.Telefone}</td>
            <td id={`${empresa}-email`} key={`${empresa}-email`}>{row.Email}</td>
            <td id={`${empresa}-categoria`} key={`${empresa}-categoria`}>{row.Categoria}</td>
            <td id={`${empresa}-acoes`} key={`${empresa}-acoes`}>
              <button>Editar</button>
              <button onClick={() => handleDeletar(row.CNPJ)}>Deletar</button>
            </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default FornecedoresTable
