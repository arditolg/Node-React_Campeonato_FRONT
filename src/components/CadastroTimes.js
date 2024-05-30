import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CadastroTimes.css";

const CadastroTimes = () => {
  const [nome, setNome] = useState("");
  const [escudo, setEscudo] = useState(null);
  const [times, setTimes] = useState([]);

  // Função para carregar os times cadastrados ao montar o componente
  useEffect(() => {
    carregarTimes();
  }, []);

  // Função para carregar os times cadastrados
  const carregarTimes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/times");
      setTimes(response.data);
    } catch (error) {
      console.error("Erro ao carregar times:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("escudo", escudo);

      await axios.post("http://localhost:5000/api/times", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Time cadastrado com sucesso!");
      setNome("");
      setEscudo(null);
      carregarTimes(); // Recarrega a lista de times após o cadastro
    } catch (error) {
      console.error("Erro ao cadastrar time:", error);
      alert("Erro ao cadastrar time. Por favor, tente novamente.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-form">
        <h2>Cadastre seu time</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome do Time:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="escudo">Escudo:</label>
            <input
              type="file"
              id="escudo"
              name="escudo"
              accept="image/*"
              onChange={(e) => setEscudo(e.target.files[0])}
              required
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
      <div className="lista-times">
        <h2>Times Cadastrados</h2>
        <table>
          <thead>
            <tr>
              <th>Índice</th>
              <th>Nome do Time</th>
              <th>Escudo</th>
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{time.nome}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${time.escudo}`}
                    alt={time.nome}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CadastroTimes;
