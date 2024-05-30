import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const CriarCampeonato = () => {
  const [times, setTimes] = useState([]);
  const [nomeCampeonato, setNomeCampeonato] = useState("");
  const [timeSelecionado, setTimeSelecionado] = useState("");
  const [timesSelecionados, setTimesSelecionados] = useState([]);
  const [error, setError] = useState("");
  const [campeonatoCriado, setCampeonatoCriado] = useState(false);

  useEffect(() => {
    carregarTimes();
  }, []);

  const carregarTimes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/times");
      setTimes(response.data);
    } catch (error) {
      console.error("Erro ao carregar times:", error);
    }
  };

  const handleTimeChange = (event) => {
    setTimeSelecionado(event.target.value);
  };

  const handleAdicionarTime = () => {
    if (timeSelecionado) {
      const selectedTime = times.find(
        (time) => time.id === parseInt(timeSelecionado)
      );
      setTimesSelecionados([...timesSelecionados, selectedTime]);
      setTimeSelecionado("");

      const updatedTimes = times.filter(
        (time) => time.id !== parseInt(timeSelecionado)
      );
      setTimes(updatedTimes);
    }
  };

  const handleExcluirTime = (index) => {
    const updatedTimes = [...timesSelecionados];
    updatedTimes.splice(index, 1);
    setTimesSelecionados(updatedTimes);
  };

  const handleCriarCampeonato = async () => {
    if (timesSelecionados.length !== 8) {
      setError("Um campeonato precisa ter exatamente 8 times.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/campeonatos",
        {
          nome: nomeCampeonato,
          times: timesSelecionados,
        }
      );
      console.log(response.data.message); // Mensagem de sucesso
      setCampeonatoCriado(true);
      setNomeCampeonato(""); // Limpa o campo de nome do campeonato
      setTimesSelecionados([]); // Limpa a lista de times selecionados
      setTimes([]); // Limpa a lista de times disponíveis
    } catch (error) {
      console.error("Erro ao criar campeonato:", error);
      // Trate o erro aqui
    }
  };

  return (
    <div className="criar-campeonato-container">
      <h2>Criar Campeonato</h2>
      {campeonatoCriado ? (
        <p>Campeonato criado com sucesso!</p>
      ) : (
        <form>
          <div>
            <label htmlFor="nomeCampeonato">Nome do Campeonato:</label>
            <input
              type="text"
              id="nomeCampeonato"
              name="nomeCampeonato"
              value={nomeCampeonato}
              onChange={(e) => setNomeCampeonato(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="times">Selecione um time:</label>
            <select
              id="times"
              name="times"
              value={timeSelecionado}
              onChange={handleTimeChange}
            >
              <option value="">Selecione um time</option>
              {times.map((time) => (
                <option key={time.id} value={time.id}>
                  {time.nome}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAdicionarTime}>
              Adicionar Time
            </button>
          </div>
          {/* Listagem dos times selecionados */}
          <div>
            <h3>Times Selecionados:</h3>
            <ul>
              {timesSelecionados.map((time, index) => (
                <li key={index}>
                  {time.nome}
                  <FaTrash
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleExcluirTime(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="button" onClick={handleCriarCampeonato}>
            Criar Campeonato
          </button>
        </form>
      )}
    </div>
  );
};

export default CriarCampeonato;
