import React, { useState } from "react";
import CadastroTimes from "./CadastroTimes";
import CriarCampeonato from "./CriarCampeonato";
import Campeonatos from "./Campeonatos";
import CampeonatosFinalizados from "./CampeonatosFinalizados";
import "../css/styles.css";

const Dashboard = ({ setPage }) => {
  const [currentPage, setCurrentPage] = useState(null);

  const handleLinkClick = (page) => {
    setCurrentPage(page);
    setPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "cadastrar-times":
        return <CadastroTimes />;
      case "criar-campeonato":
        return <CriarCampeonato />;
      case "campeonatos":
        return <Campeonatos />;
      case "campeonatos-finalizados":
        return <CampeonatosFinalizados />;
      default:
        return (
          <div>
            <h2>Bem-vindo à página principal</h2>
            <p>Selecione uma opção no menu lateral para começar.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="menu-container">
        {" "}
        {/* Novo contêiner para o menu */}
        <div className="sidebar">
          <ul>
            <li onClick={() => handleLinkClick("home")}>Home</li>
            <li onClick={() => handleLinkClick("cadastrar-times")}>
              Cadastrar Times
            </li>
            <li onClick={() => handleLinkClick("criar-campeonato")}>
              Criar Campeonato
            </li>
            <li onClick={() => handleLinkClick("campeonatos")}>
              Iniciar Campeonato
            </li>
            <li onClick={() => handleLinkClick("campeonatos-finalizados")}>
              Campeonato Finalizados
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
