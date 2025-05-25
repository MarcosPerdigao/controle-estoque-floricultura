import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [editId, setEditId] = useState(null);

  const api = axios.create({ baseURL: 'http://localhost:3001' });

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const res = await api.get('/produtos');
      setProdutos(res.data);
    } catch {
      alert('Erro ao buscar produtos');
    }
  };

  const limparCampos = () => {
    setNome('');
    setQuantidade('');
    setPreco('');
    setEditId(null);
  };

  const salvarProduto = async () => {
    if (!nome || !quantidade || !preco) {
      alert('Nome, quantidade e preço são obrigatórios');
      return;
    }

    const dados = {
      nome,
      quantidade: Number(quantidade),
      preco: Number(preco),
    };

    try {
      if (editId) {
        await api.put(`/produtos/${editId}`, dados);
      } else {
        await api.post('/produtos', dados);
      }
      limparCampos();
      fetchProdutos();
    } catch {
      alert('Erro ao salvar produto');
    }
  };

  const editarProduto = (produto) => {
    setNome(produto.nome);
    setQuantidade(produto.quantidade);
    setPreco(produto.preco);
    setEditId(produto.id);
  };

  const deletarProduto = async (id) => {
    if (window.confirm('Confirma exclusão?')) {
      try {
        await api.delete(`/produtos/${id}`);
        fetchProdutos();
      } catch {
        alert('Erro ao deletar produto');
      }
    }
  };

  return (
    <div className="container">
      <h1>
        <span role="img" aria-label="folha">
          🌿
        </span>{' '}
        Verde em Vários Tons
      </h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          placeholder="Quantidade"
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          style={{ marginLeft: 10 }}
        />
        <input
          type="number"
          placeholder="Preço (R$)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          style={{
            marginLeft: 10,
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button onClick={salvarProduto} className="salvar" style={{ marginLeft: 10 }}>
          {editId ? <FaEdit /> : <FaPlus />} {editId ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>

      <table border="1" width="100%" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td className={p.quantidade < 5 ? 'qtd-baixa' : ''}>{p.quantidade}</td>
              <td>
                {Number(p.preco).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td>
                <button onClick={() => editarProduto(p)} className="editar">
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => deletarProduto(p.id)}
                  className="excluir"
                  style={{ marginLeft: 5 }}
                >
                  <FaTrashAlt /> Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="rodape">
        <p>
          Desenvolvido para <strong>Verde em Vários Tons</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
