import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./Team.css";
import MenuBar from "../MenuBar/MenuBar";
import { Link } from "react-router-dom";
import enzo from "../../assets/enzo.jpg";
import andre from "../../assets/andre.jpg";
import raphael from "../../assets/raphael 3.jpg";
import moraes from "../../assets/moraes.png";

const Team = () => {
  return (
    <div className="team-body">
      <MenuBar />
      <div className="team-container">
        <Link to="/" className="back-button">
          <FaArrowLeft />
        </Link>
        <h1 className="team-title">Equipe</h1>
        <div className="team-members">
          <div className="team-member-role">
            <img src={andre} className="team-member-images" />
            <h2>André Luiz</h2>
          </div>
          <div className="team-member-role">
            <img src={enzo} className="team-member-images" />
            <h2>Enzo Yuki </h2>
          </div>
        </div>
        <div className="team-members">
          <div className="team-member-role">
            <img src={moraes} className="team-member-images" />
            <h2>Felipe Moraes</h2>
          </div>
          <div className="team-member-role">
            <img
              src={raphael}
              className="team-member-images"
              alt="Foto do Enzo"
            />
            <h2>Raphael Augusto</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
