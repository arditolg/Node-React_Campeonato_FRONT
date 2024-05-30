import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const CampeonatosFinalizados = () => {
  const [selectedCampeonatoId, setSelectedCampeonatoId] = useState("");
  const [campeonatos, setCampeonatos] = useState([]);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    carregarCampeonatos();
  }, []);

  useEffect(() => {
    if (selectedCampeonatoId) {
      carregarResultados(selectedCampeonatoId);
    }
  }, [selectedCampeonatoId]);

  const carregarCampeonatos = async () => {
    try {
      const response = await axios.get(
        `${config.baseUrl}/api/campeonatoslista/finalizados`
      );
      setCampeonatos(response.data);
    } catch (error) {
      console.error("Erro ao carregar campeonatos:", error);
    }
  };

  const handleCampeonatoChange = (event) => {
    setSelectedCampeonatoId(event.target.value);
  };

  const carregarResultados = async (campeonatoId) => {
    try {
      const response = await axios.get(
        `${config.baseUrl}/api/campeonatoslista/finalizados/${campeonatoId}`
      );
      setResultados(response.data);
    } catch (error) {
      console.error("Erro ao carregar resultados:", error);
    }
  };

  return (
    <div className="campeonatos-container">
      <h2>Selecione um campeonato</h2>
      <select value={selectedCampeonatoId} onChange={handleCampeonatoChange}>
        <option value="">Selecione um Campeonato Finalizado</option>
        {campeonatos.map((campeonato) => (
          <option key={campeonato.id} value={campeonato.id}>
            {campeonato.nome}
          </option>
        ))}
      </select>

      <div className="resultados-container">
        <h2>Resultados</h2>
        {resultados.map((resultado, index) => (
          <div key={index}>
            <h3>{resultado.campeonato_nome}</h3>
            <p>Campeão: {resultado.resultado_final[0].vencedor.nome}</p>
            <p>
              Vice-Campeão:{" "}
              {resultado.resultado_final[0].time1.id !==
              resultado.resultado_final[0].vencedor.id
                ? resultado.resultado_final[0].time1.nome
                : resultado.resultado_final[0].time2.nome}
            </p>
            <p>
              Terceiro Lugar: {resultado.resultado_terceiro[0].vencedor.nome}
            </p>
            <p>
              Quarto Lugar:{" "}
              {resultado.resultado_terceiro[0].time1.id !==
              resultado.resultado_terceiro[0].vencedor.id
                ? resultado.resultado_terceiro[0].time1.nome
                : resultado.resultado_terceiro[0].time2.nome}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampeonatosFinalizados;
