import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./Tutorial.css";
import MenuBar from "../MenuBar/MenuBar";
import { Link } from "react-router-dom";

const Tutorial = () => {
  return (
    <div className="tutorial-body">
      <MenuBar />
      <div className="tutorial-container">
        <Link to="/" className="back-button">
          <FaArrowLeft />
        </Link>
        <h1 className="tutorial-title">
          WebSite para diagnóstico generalizado sobre diversos tipos de Sarnas
          Caninas
        </h1>
        <p>
          A aplicação utiliza Inteligência Artificial e Machine Learning através
          da técnica de redes neurais convolucionais para um diagnóstico preciso
          do seu cachorro. AINDA não substituí uma consulta, portanto não deixe
          de levar o seu pet ao veterinário
        </p>
        <p>Dicas:</p>
        <ul>
          <li>
            A análise tem sua confiabilidade atestada para diagnóstico de
            cachorros, portanto não submeta foto de outros animais!
          </li>
          <li>
            Embora a raça não interfira na análise, a aplicação não compara
            quais raças estão sendo cadastradas com suas fotos, então pesquise
            anteriormente a raça do seu pet!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Tutorial;
