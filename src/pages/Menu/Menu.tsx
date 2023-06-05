import React, { useState, useEffect } from "react";
import {
  FaQuestionCircle,
  FaHistory,
  FaUserAlt,
  FaStethoscope,
  FaDog,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Menu.css";
import logo from "../../figs/logo-transformed-removebg-preview.png";
import MenuBar from "../MenuBar/MenuBar";
import axios from "axios";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:4000/users/${userId}`)
      .then((response) => {
        setUserName(response.data.nome);
      })
      .catch((error) => {
        console.error("Erro ao obter o nome do usuário:", error);
      });
  }, []);

  const handleLogout = () => {
    // Limpar o ID do usuário e fazer logout
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="menu-body">
      <button className="menu-logout" onClick={handleLogout}>
          Logout
        </button>
      <div className="menu-detail">
        <img src={logo} alt="Logo MyPet" className="menu-logo" />
        <div className="menu-container">
          <div className="menu-items">
            <Link to="/diagnosis" className="menu-button">
              <FaStethoscope />
              Diagnosticar
            </Link>

            <Link to="/dogregister" className="menu-button">
              <FaDog />
              Cadastrar pet
            </Link>

            <Link to="/tutorial" className="menu-button">
              <FaQuestionCircle />
              Tutorial
            </Link>

            <Link to="/history" className="menu-button">
              <FaHistory />
              Histórico
            </Link>

            <Link to="/team" className="menu-button">
              <FaUserAlt />
              Equipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
