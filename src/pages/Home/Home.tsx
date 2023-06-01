import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import HomeImg from "../../assets/home.png";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <img src={HomeImg} alt="Cachorro com veterinário" className="home-logo" />
      <h1 className="home-title">
        Aplicação para identificar presença de sarna em cachorros.
      </h1>
      <Link to="/" className="home-button">
        Entrar
      </Link>
    </div>
  );
};

export default Home;
