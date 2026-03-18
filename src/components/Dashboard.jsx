import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import '../assets/style/Dashboards.css';

const Dashboards = () => {
  const [dados, setDados] = useState([]);
  const COLORS_CATEGORIA = ['#f1c40f', '#9b59b6', '#e67e22'];

  useEffect(() => {
    fetch('https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe')
      .then(res => res.json())
      .then(data => setDados(data))
      .catch(err => console.error(err));
  }, []);

  const dataCategoria = dados.reduce((acc, curr) => {
    const cat = curr.Categoria || 'S/C';
    const found = acc.find(item => item.name === cat);
    if (found) found.value++;
    else acc.push({ name: cat, value: 1 });
    return acc;
  }, []);

  const dataUF = dados.reduce((acc, curr) => {
    const uf = curr.UF || 'S/I';
    const found = acc.find(item => item.name === uf);
    if (found) found.value++;
    else acc.push({ name: uf, value: 1 });
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  const dataStatus = dados.reduce((acc, curr) => {
    const status = curr.Status || 'Ativo';
    const found = acc.find(item => item.name === status);
    if (found) found.value++;
    else acc.push({ name: status, value: 1 });
    return acc;
  }, []);

  const dataStackedStatus = dados.reduce((acc, curr) => {
    const cat = curr.Categoria || 'S/C';
    const status = curr.Status || 'Ativo';
    
    const found = acc.find(item => item.Categoria === cat);
    
    if (found) {
      found[status] = (found[status] || 0) + 1;
    } else {
      acc.push({
        Categoria: cat,
        Ativo: status === 'Ativo' ? 1 : 0,
        Inativo: status === 'Inativo' ? 1 : 0
      });
    }
    return acc;
  }, []);

  return (
    <div className="dash-container">
      <h1 id="home-title">Indicadores Estratégicos</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Fornecedores</h3>
          <p className="stat-number">{dados.length}</p>
        </div>
        <div className="stat-card">
          <h3>Estados Atendidos</h3>
          <p className="stat-number">{dataUF.length}</p>
        </div>
      </div>

      <div className="charts-grid">
        
        <div className="chart-box">
          <h3>Saúde da Base (Status)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={dataStatus} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                {dataStatus.map((entry, index) => (
                  <Cell 
                    key={`cell-status-${index}`} 
                    fill={entry.name === 'Ativo' ? '#2ecc71' : '#e74c3c'} 
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={20}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Distribuição por UF</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dataUF}>
              <XAxis dataKey="name" fontSize={12} tickLine={false} />
              <YAxis allowDecimals={false} stroke="#ccc" />
              <Tooltip cursor={{fill: 'rgba(52, 152, 219, 0.1)'}}/>
              <Bar dataKey="value" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Volume por Categoria</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie 
                data={dataCategoria} 
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80} 
                dataKey="value"
                fontSize={12}
              >
                {dataCategoria.map((entry, index) => (
                  <Cell key={`cell-cat-${index}`} fill={COLORS_CATEGORIA[index % COLORS_CATEGORIA.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Disponibilidade por Setor</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dataStackedStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="Categoria" fontSize={12} tickLine={false} />
              <YAxis allowDecimals={false} stroke="#ccc" />
              <Tooltip />
              <Legend verticalAlign="bottom" height={20}/>
              <Bar dataKey="Ativo" stackId="a" fill="#2ecc71" radius={[0, 0, 4, 4]} />
              <Bar dataKey="Inativo" stackId="a" fill="#e74c3c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Dashboards;