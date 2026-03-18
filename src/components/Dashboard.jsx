import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../assets/style/Dashboards.css';

const Dashboards = () => {
  const [dados, setDados] = useState([]);
  const COLORS = ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c'];

  useEffect(() => {
    fetch('https://api.sheetbest.com/sheets/0ef771ba-55b5-4f9c-a7d7-d163b10c90fe')
      .then(res => res.json())
      .then(data => setDados(data))
      .catch(err => console.error(err));
  }, []);

  const dataCategoria = dados.reduce((acc, curr) => {
    const found = acc.find(item => item.name === curr.Categoria);
    if (found) found.value++;
    else acc.push({ name: curr.Categoria || 'Não Definido', value: 1 });
    return acc;
  }, []);

  return (
    <div className="dash-container">
      <h1 id="home-title">Indicadores de Fornecedores</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Fornecedores</h3>
          <p className="stat-number">{dados.length}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-box">
          <h3>Distribuição por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={dataCategoria} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {dataCategoria.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Volume de Registros</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataCategoria}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboards;