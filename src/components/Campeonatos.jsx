import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const Campeonatos = () => {
  const [campeonatos, setCampeonatos] = useState([]);
  const [selectedCampeonato, setSelectedCampeonato] = useState("");
  const [timesDoCampeonato, setTimesDoCampeonato] = useState([]);
  const [chaveamentos, setChaveamentos] = useState([]);
  const [resultadosQuartas, setResultadosQuartas] = useState([]);
  const [chaveamentosSemi, setChaveamentosSemi] = useState([]);
  const [resultadosSemi, setResultadosSemi] = useState([]);
  const [chaveamentosFinal, setChaveamentosFinal] = useState([]);
  const [resultadosTerceiro, setResultadosTerceiro] = useState([]);
  const [chaveamentosTerceiro, setChaveamentosTerceiro] = useState([]);
  const [resultadosCampeao, setResultadosCampeao] = useState([]);

  useEffect(() => {
    carregarCampeonatos();
  }, []);

  const carregarCampeonatos = async () => {
    try {
      const response = await axios.get(
        `${config.baseUrl}/api/campeonatoslista`
      );
      setCampeonatos(response.data);
    } catch (error) {
      console.error("Erro ao carregar campeonatos:", error);
    }
  };

  const handleCampeonatoChange = async (event) => {
    const campeonatoId = event.target.value;
    setSelectedCampeonato(campeonatoId);
    try {
      const response = await axios.get(
        `${config.baseUrl}/api/campeonatos/${campeonatoId}/times`
      );
      setTimesDoCampeonato(response.data);
    } catch (error) {
      console.error("Erro ao carregar times do campeonato:", error);
    }
  };

  const handleFazerChaveamento = () => {
    if (timesDoCampeonato.length < 8) {
      console.error(
        "É necessário pelo menos 8 times para fazer o chaveamento."
      );
      return;
    }

    const shuffledTimes = [...timesDoCampeonato].sort(
      () => 0.5 - Math.random()
    );
    const newChaveamentos = [];

    for (let i = 0; i < shuffledTimes.length; i += 2) {
      if (shuffledTimes[i + 1]) {
        newChaveamentos.push([shuffledTimes[i], shuffledTimes[i + 1]]);
      }
    }

    setChaveamentos(newChaveamentos);
    salvarChaveamento(newChaveamentos, selectedCampeonato);
  };

  const salvarChaveamento = async (chaveamento, idCampeonato) => {
    try {
      const response = await axios.post(
        `${config.baseUrl}/api/campeonatos/salvar-chaveamento`,
        {
          chaveamento,
          idCampeonato,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao salvar chaveamento:", error);
    }
  };

  const handleGerarResultadoQuartas = () => {
    const resultados = chaveamentos.map(([time1, time2]) => {
      const golsTime1 = Math.floor(Math.random() * 5);
      const golsTime2 = Math.floor(Math.random() * 5);

      let vencedor;
      let golsPenaltisTime1 = 0;
      let golsPenaltisTime2 = 0;

      // Verificar empate após tempo regulamentar
      if (golsTime1 === golsTime2) {
        // Simular disputa de pênaltis
        while (golsPenaltisTime1 === golsPenaltisTime2) {
          golsPenaltisTime1 = Math.floor(Math.random() * 6); // Número de gols de pênaltis para time 1
          golsPenaltisTime2 = Math.floor(Math.random() * 6); // Número de gols de pênaltis para time 2
        }

        // Determinar o vencedor dos pênaltis
        vencedor = golsPenaltisTime1 > golsPenaltisTime2 ? time1 : time2;
      } else {
        // Determinar o vencedor do jogo normal
        vencedor = golsTime1 > golsTime2 ? time1 : time2;
      }

      // Somar gols normais e gols de pênaltis
      const golsTotalTime1 = golsTime1 + golsPenaltisTime1;
      const golsTotalTime2 = golsTime2 + golsPenaltisTime2;

      return {
        time1,
        golsTime1,
        golsPenaltisTime1,
        time2,
        golsTime2,
        golsPenaltisTime2,
        vencedor,
        golsTotalTime1,
        golsTotalTime2,
      };
    });

    setResultadosQuartas(resultados);
    salvarResultadoQuartas(resultados, selectedCampeonato);
  };

  const handleGerarResultadoSemi = () => {
    const resultados = chaveamentosSemi.map(([time1, time2]) => {
      const golsTime1 = Math.floor(Math.random() * 5);
      const golsTime2 = Math.floor(Math.random() * 5);

      let vencedor;
      let golsPenaltisTime1 = 0;
      let golsPenaltisTime2 = 0;

      // Verificar empate após tempo regulamentar
      if (golsTime1 === golsTime2) {
        // Simular disputa de pênaltis
        while (golsPenaltisTime1 === golsPenaltisTime2) {
          golsPenaltisTime1 = Math.floor(Math.random() * 6); // Número de gols de pênaltis para time 1
          golsPenaltisTime2 = Math.floor(Math.random() * 6); // Número de gols de pênaltis para time 2
        }

        // Determinar o vencedor dos pênaltis
        vencedor = golsPenaltisTime1 > golsPenaltisTime2 ? time1 : time2;
      } else {
        // Determinar o vencedor do jogo normal
        vencedor = golsTime1 > golsTime2 ? time1 : time2;
      }

      // Somar gols normais e gols de pênaltis
      const golsTotalTime1 = golsTime1 + golsPenaltisTime1;
      const golsTotalTime2 = golsTime2 + golsPenaltisTime2;

      return {
        time1,
        golsTime1,
        golsPenaltisTime1,
        time2,
        golsTime2,
        golsPenaltisTime2,
        vencedor,
        golsTotalTime1,
        golsTotalTime2,
      };
    });

    setResultadosSemi(resultados);
    salvarResultadoSemi(resultados, selectedCampeonato);
  };

  const handleGerarResultadoTerceiro = () => {
    const resultados = chaveamentosTerceiro.map(([time1, time2]) => {
      const golsTime1 = Math.floor(Math.random() * 5);
      const golsTime2 = Math.floor(Math.random() * 5);

      let vencedor;
      let golsPenaltisTime1 = 0;
      let golsPenaltisTime2 = 0;

      // Verificar empate após tempo regulamentar
      if (golsTime1 === golsTime2) {
        // Simular disputa de pênaltis
        while (golsPenaltisTime1 === golsPenaltisTime2) {
          golsPenaltisTime1 = Math.floor(Math.random() * 6); // Número de gols de pênaltis para time 1
          golsPenaltisTime2 = Math.floor(Math.random() * 6); // Número de gols de pênaltis para time 2
        }

        // Determinar o vencedor dos pênaltis
        vencedor = golsPenaltisTime1 > golsPenaltisTime2 ? time1 : time2;
      } else {
        // Determinar o vencedor do jogo normal
        vencedor = golsTime1 > golsTime2 ? time1 : time2;
      }

      // Somar gols normais e gols de pênaltis
      const golsTotalTime1 = golsTime1 + golsPenaltisTime1;
      const golsTotalTime2 = golsTime2 + golsPenaltisTime2;

      return {
        time1,
        golsTime1,
        golsPenaltisTime1,
        time2,
        golsTime2,
        golsPenaltisTime2,
        vencedor,
        golsTotalTime1,
        golsTotalTime2,
      };
    });

    setResultadosTerceiro(resultados);
    salvarResultadoCampeao(resultados, selectedCampeonato);
  };

  const handleGerarResultadoCampeao = () => {
    const resultados = chaveamentosFinal.map(([time1, time2]) => {
      const golsTime1 = Math.floor(Math.random() * 5);
      const golsTime2 = Math.floor(Math.random() * 5);

      let vencedor;
      let golsPenaltisTime1 = 0;
      let golsPenaltisTime2 = 0;

      // Verificar empate após tempo regulamentar
      if (golsTime1 === golsTime2) {
        // Simular disputa de pênaltis
        while (golsPenaltisTime1 === golsPenaltisTime2) {
          golsPenaltisTime1 = Math.floor(Math.random() * 6); // Número de gols de pênaltis para time 1
          golsPenaltisTime2 = Math.floor(Math.random() * 6); // Número de gols de pênaltis para time 2
        }

        // Determinar o vencedor dos pênaltis
        vencedor = golsPenaltisTime1 > golsPenaltisTime2 ? time1 : time2;
      } else {
        // Determinar o vencedor do jogo normal
        vencedor = golsTime1 > golsTime2 ? time1 : time2;
      }

      // Somar gols normais e gols de pênaltis
      const golsTotalTime1 = golsTime1 + golsPenaltisTime1;
      const golsTotalTime2 = golsTime2 + golsPenaltisTime2;

      return {
        time1,
        golsTime1,
        golsPenaltisTime1,
        time2,
        golsTime2,
        golsPenaltisTime2,
        vencedor,
        golsTotalTime1,
        golsTotalTime2,
      };
    });

    setResultadosCampeao(resultados);
    salvarResultadoTerceiro(resultados, selectedCampeonato);
  };

  const salvarResultadoQuartas = async (resultados, idCampeonato) => {
    const pontosTimes = resultados.reduce(
      (acc, { time1, golsTime1, time2, golsTime2 }) => {
        acc[time1.id] = (acc[time1.id] || 0) + golsTime1 - golsTime2;
        acc[time2.id] = (acc[time2.id] || 0) + golsTime2 - golsTime1;
        return acc;
      },
      {}
    );

    try {
      const response = await axios.post(
        `${config.baseUrl}/api/campeonatos/salvar-resultado-quartas`,
        {
          resultados,
          pontosTimes,
          idCampeonato,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao salvar resultado das quartas de finais:", error);
    }
  };

  const salvarResultadoSemi = async (resultados, idCampeonato) => {
    const pontosTimes = resultados.reduce(
      (acc, { time1, golsTime1, time2, golsTime2 }) => {
        acc[time1.id] = (acc[time1.id] || 0) + golsTime1 - golsTime2;
        acc[time2.id] = (acc[time2.id] || 0) + golsTime2 - golsTime1;
        return acc;
      },
      {}
    );

    try {
      const response = await axios.post(
        `${config.baseUrl}/api/campeonatos/salvar-resultado-semi`,
        {
          resultados,
          pontosTimes,
          idCampeonato,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao salvar resultado das semi finais:", error);
    }
  };

  const salvarResultadoCampeao = async (resultados, idCampeonato) => {
    const pontosTimes = resultados.reduce(
      (acc, { time1, golsTime1, time2, golsTime2 }) => {
        acc[time1.id] = (acc[time1.id] || 0) + golsTime1 - golsTime2;
        acc[time2.id] = (acc[time2.id] || 0) + golsTime2 - golsTime1;
        return acc;
      },
      {}
    );

    try {
      const response = await axios.post(
        `${config.baseUrl}/api/campeonatos/salvar-resultado-final`,
        {
          resultados,
          pontosTimes,
          idCampeonato,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao salvar resultado do campeao:", error);
    }
  };

  const salvarResultadoTerceiro = async (resultados, idCampeonato) => {
    const pontosTimes = resultados.reduce(
      (acc, { time1, golsTime1, time2, golsTime2 }) => {
        acc[time1.id] = (acc[time1.id] || 0) + golsTime1 - golsTime2;
        acc[time2.id] = (acc[time2.id] || 0) + golsTime2 - golsTime1;
        return acc;
      },
      {}
    );

    try {
      const response = await axios.post(
        `${config.baseUrl}/api/campeonatos/salvar-resultado-terceiro`,
        {
          resultados,
          pontosTimes,
          idCampeonato,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao salvar resultado do terceiro:", error);
    }
  };

  const handleGerarJogosSemi = async () => {
    const vencedoresQuartas = resultadosQuartas.map(
      (resultado) => resultado.vencedor
    );
    const newChaveamentosSemi = [];

    for (let i = 0; i < vencedoresQuartas.length; i += 2) {
      if (vencedoresQuartas[i + 1]) {
        newChaveamentosSemi.push([
          vencedoresQuartas[i],
          vencedoresQuartas[i + 1],
        ]);
      }
    }

    setChaveamentosSemi(newChaveamentosSemi);

    try {
      const response = await axios.post(
        `${config.baseUrl}/api/campeonatos/salvar-chaveamento-semi`,
        {
          chaveamentoSemi: newChaveamentosSemi,
          idCampeonato: selectedCampeonato,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao salvar chaveamento semi:", error);
    }
  };

  const handleGerarJogosFinais = async () => {
    const perdedoresSemi = resultadosSemi.map((resultado) =>
      resultado.vencedor === resultado.time1 ? resultado.time2 : resultado.time1
    );
    const newChaveamentosFinal = [];

    for (let i = 0; i < perdedoresSemi.length; i += 2) {
      if (perdedoresSemi[i + 1]) {
        newChaveamentosFinal.push([perdedoresSemi[i], perdedoresSemi[i + 1]]);
      }
    }

    setChaveamentosTerceiro(newChaveamentosFinal);

    try {
      const response = await axios.post(
        `${config.baseUrl}/api/campeonatos/salvar-chaveamento-final`,
        {
          chaveamentoFinal: newChaveamentosFinal,
          idCampeonato: selectedCampeonato,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao salvar chaveamento final:", error);
    }

    // Aqui estamos gerando os jogos de disputa do terceiro lugar
    const perdedoresTerceiro = resultadosSemi.map((resultado) =>
      resultado.vencedor === resultado.time1 ? resultado.time1 : resultado.time2
    );
    const newChaveamentosTerceiro = [];

    for (let i = 0; i < perdedoresTerceiro.length; i += 2) {
      if (perdedoresTerceiro[i + 1]) {
        newChaveamentosTerceiro.push([
          perdedoresTerceiro[i],
          perdedoresTerceiro[i + 1],
        ]);
      }
    }

    setChaveamentosFinal(newChaveamentosTerceiro); // Adiciona os jogos de disputa do terceiro lugar

    try {
      const response = await axios.post(
        `${config.baseUrl}/api/campeonatos/salvar-chaveamento-terceiro`,
        {
          chaveamentoTerceiro: newChaveamentosTerceiro,
          idCampeonato: selectedCampeonato,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao salvar chaveamento terceiro:", error);
    }
  };

  return (
    <div className="campeonatos-container">
      <h2>Selecione um campeonato para iniciar</h2>
      <select value={selectedCampeonato} onChange={handleCampeonatoChange}>
        <option value="">Selecione um Campeonato Não Finalizado</option>
        {campeonatos.map((campeonato) => (
          <option key={campeonato.id} value={campeonato.id}>
            {campeonato.nome}
          </option>
        ))}
      </select>

      <div className="content-container">
        {timesDoCampeonato.length > 0 && (
          <div className="times-list-container">
            <h3>Times do Campeonato</h3>
            <ul className="times-list">
              {timesDoCampeonato.map((time) => (
                <li key={time.id} className="time-item">
                  <img
                    src={`${config.baseUrl}/${time.escudo}`}
                    alt={time.nome}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <span>{time.nome}</span>
                </li>
              ))}
            </ul>
            <button onClick={handleFazerChaveamento}>Fazer Chaveamento</button>
          </div>
        )}
        {chaveamentos.length > 0 && (
          <div className="chaveamentos-container">
            <h3>Chaveamentos</h3>
            <ul className="chaveamentos-list">
              {chaveamentos.map((chaveamento, index) => (
                <li key={index} className="chaveamento-item">
                  <div className="chaveamento-time">
                    <span>{chaveamento[0].nome}</span>
                  </div>
                  <span>vs</span>
                  <div className="chaveamento-time">
                    <span>{chaveamento[1].nome}</span>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleGerarResultadoQuartas}>
              Gerar Resultado Quartas de Finais
            </button>
          </div>
        )}

        {resultadosQuartas.length > 0 && (
          <div className="chaveamentos-container">
            <h3>Quartas de Finais</h3>
            <ul className="chaveamentos-list">
              {resultadosQuartas.map((resultado, index) => (
                <li key={index} className="chaveamento-item">
                  <div className="chaveamento-confronto">
                    <span>{resultado.time1.nome}</span>
                    <span>vs</span>
                    <span>{resultado.time2.nome}</span>
                  </div>
                  <div className="chaveamento-resultados">
                    <div className="resultado-tempo-regulamentar">
                      <span>
                        {resultado.golsTime1} - {resultado.golsTime2}
                      </span>
                    </div>
                    {resultado.golsPenaltisTime1 !== undefined &&
                      resultado.golsPenaltisTime1 > 0 && (
                        <div className="resultado-penaltis">
                          <span>{resultado.golsPenaltisTime1} (P)</span>
                          <span>{resultado.golsPenaltisTime2} (P)</span>
                        </div>
                      )}
                  </div>
                  <div className="chaveamento-vencedor">
                    <span>Vencedor: {resultado.vencedor.nome}</span>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleGerarJogosSemi}>
              Gerar Jogos Semi Finais
            </button>
          </div>
        )}

        <div className="semi">
          {chaveamentosSemi.length > 0 && (
            <div className="chaveamentos-container">
              <h3>Chaveamento Semi Finais</h3>
              <ul className="chaveamentos-list">
                {chaveamentosSemi.map((resultado, index) => (
                  <li key={index} className="chaveamento-item">
                    <div className="chaveamento-time">
                      <span>{resultado[0].nome}</span>
                    </div>
                    <span>vs</span>
                    <div className="chaveamento-time">
                      <span>{resultado[1].nome}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={handleGerarResultadoSemi}>
                Gerar Resultado Semi Finais
              </button>
            </div>
          )}

          {resultadosSemi.length > 0 && (
            <div className="chaveamentos-container">
              <h3>Semi Finais</h3>
              <ul className="chaveamentos-list">
                {resultadosSemi.map((resultado, index) => (
                  <li key={index} className="chaveamento-item">
                    <div className="chaveamento-confronto">
                      <span>{resultado.time1.nome}</span>
                      <span>vs</span>
                      <span>{resultado.time2.nome}</span>
                    </div>
                    <div className="chaveamento-resultados">
                      <div className="resultado-tempo-regulamentar">
                        <span>
                          {resultado.golsTime1} - {resultado.golsTime2}
                        </span>
                      </div>
                      {resultado.golsPenaltisTime1 !== undefined &&
                        resultado.golsPenaltisTime1 > 0 && (
                          <div className="resultado-penaltis">
                            <span>{resultado.golsPenaltisTime1} (P)</span>
                            <span>{resultado.golsPenaltisTime2} (P)</span>
                          </div>
                        )}
                    </div>
                    <div className="chaveamento-vencedor">
                      <span>Vencedor: {resultado.vencedor.nome}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={handleGerarJogosFinais}>
                Gerar Jogos Finais
              </button>
            </div>
          )}
        </div>

        <div className="finais">
          {chaveamentosTerceiro.length > 0 && (
            <div className="chaveamentos-container">
              <h3>Disputa pelo Campeonato</h3>
              <ul className="chaveamentos-list">
                {chaveamentosTerceiro.map((chaveamento, index) => (
                  <li key={index} className="chaveamento-item">
                    <div className="chaveamento-time">
                      <span>{chaveamento[0].nome}</span>
                    </div>
                    <span>vs</span>
                    <div className="chaveamento-time">
                      <span>{chaveamento[1].nome}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={handleGerarResultadoTerceiro}>
                Gerar Resultado Do Campeão
              </button>
            </div>
          )}

          {chaveamentosFinal.length > 0 && (
            <div className="chaveamentos-container">
              <h3>Disputa pelo Terceiro Lugar</h3>
              <ul className="chaveamentos-list">
                {chaveamentosFinal.map((resultado, index) => (
                  <li key={index} className="chaveamento-item">
                    <div className="chaveamento-time">
                      <span>{resultado[0].nome}</span>
                    </div>
                    <span>vs</span>
                    <div className="chaveamento-time">
                      <span>{resultado[1].nome}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={handleGerarResultadoCampeao}>
                Gerar Resultado do Terceiro
              </button>
            </div>
          )}

          {resultadosTerceiro.length > 0 && (
            <div className="chaveamentos-container">
              <h3>Campeão</h3>
              <ul className="chaveamentos-list">
                {resultadosTerceiro.map((resultado, index) => (
                  <li key={index} className="chaveamento-item">
                    <div className="chaveamento-confronto">
                      <span>{resultado.time1.nome}</span>
                      <span>vs</span>
                      <span>{resultado.time2.nome}</span>
                    </div>
                    <div className="chaveamento-resultados">
                      <div className="resultado-tempo-regulamentar">
                        <span>
                          {resultado.golsTime1} - {resultado.golsTime2}
                        </span>
                      </div>
                      {resultado.golsPenaltisTime1 !== undefined &&
                        resultado.golsPenaltisTime1 > 0 && (
                          <div className="resultado-penaltis">
                            <span>{resultado.golsPenaltisTime1} (P)</span>
                            <span>{resultado.golsPenaltisTime2} (P)</span>
                          </div>
                        )}
                    </div>
                    <div className="chaveamento-vencedor">
                      <span>Vencedor: {resultado.vencedor.nome}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resultadosCampeao.length > 0 && (
            <div className="chaveamentos-container">
              <h3>Terceiro Lugar</h3>
              <ul className="chaveamentos-list">
                {resultadosCampeao.map((resultado, index) => (
                  <li key={index} className="chaveamento-item">
                    <div className="chaveamento-confronto">
                      <span>{resultado.time1.nome}</span>
                      <span>vs</span>
                      <span>{resultado.time2.nome}</span>
                    </div>
                    <div className="chaveamento-resultados">
                      <div className="resultado-tempo-regulamentar">
                        <span>
                          {resultado.golsTime1} - {resultado.golsTime2}
                        </span>
                      </div>
                      {resultado.golsPenaltisTime1 !== undefined &&
                        resultado.golsPenaltisTime1 > 0 && (
                          <div className="resultado-penaltis">
                            <span>{resultado.golsPenaltisTime1} (P)</span>
                            <span>{resultado.golsPenaltisTime2} (P)</span>
                          </div>
                        )}
                    </div>
                    <div className="chaveamento-vencedor">
                      <span>Vencedor: {resultado.vencedor.nome}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campeonatos;
