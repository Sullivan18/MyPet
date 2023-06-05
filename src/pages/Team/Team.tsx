import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./Team.css";
import MenuBar from "../MenuBar/MenuBar";
import { Link } from "react-router-dom";
import teamImage from "../../assets/enzo.jpg";

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
            <img src={teamImage} className="team-member-images" />
            <h2>André Luiz</h2>
          </div>
          <div className="team-member-role">
            <img src={teamImage} className="team-member-images" />
            <h2>Enzo Yuki </h2>
          </div>
        </div>
        <div className="team-members">
          <div className="team-member-role">
            <img src={teamImage} className="team-member-images" />
            <h2>Felipe Moraes</h2>
          </div>
          <div className="team-member-role">
            <img
              src={teamImage}
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
