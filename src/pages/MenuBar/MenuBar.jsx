import React from "react";
import { Link } from "react-router-dom";
import "./MenuBar.css";
import logo from "../../figs/logo-transformed-removebg-preview-pequeno.png";

const menuItems = [
  { id: 1, label: "Diagnóstico", path: "/diagnosis" },
  { id: 2, label: "Cadastro de pet", path: "/dogregister" },
  { id: 3, label: "Tutorial", path: "/tutorial" },
  { id: 4, label: "Histórico"},
  { id: 5, label: "Equipe"}
  
];

const MenuBar = () => (
  <div className="menubar">
    <nav className="menu">
      <ul>
        <li className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-icon" />
          </Link>
        </li>
        {menuItems.map(({ id, label, path }) => (
          <li key={id} className="menu-item">
            <Link to={path} className="btn">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default MenuBar;
