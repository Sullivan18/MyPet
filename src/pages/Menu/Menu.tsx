import React from "react";
import {
  FaQuestionCircle,
  FaHistory,
  FaUserAlt,
  FaStethoscope,
  FaDog,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Menu.css";
import logo from "../../figs/logo-transformed-removebg-preview.png";
import MenuBar from "../MenuBar/MenuBar";

const Menu: React.FC = () => {
  return (
    <div className="menu-body">
      
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
