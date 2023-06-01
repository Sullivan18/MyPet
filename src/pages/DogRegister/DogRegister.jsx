import React, { useState } from "react";
import "./DogRegister.css";
import MenuBar from "../MenuBar/MenuBar";

function DogRegister() {
  const [values, setValues] = useState({
    breed: "",
    name: "",
    sex: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    console.log("Raça:", values.breed);
    console.log("Nome:", values.name);
    console.log("Sexo:", values.sex);
  };

  return (
    <div className="register-body">
      <MenuBar/>
      <div className="register-container">
        <h1 className="register-title">Cadastro de Cachorro</h1>
        <form>
          <label className="register-label">Raça:</label>
          <input
            type="text"
            name="breed"
            value={values.breed}
            onChange={handleInputChange}
            className="register-input"
          />

          <label className="register-label">Nome:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            className="register-input"
          />

          <label className="register-label">Sexo:</label>
          <select
            name="sex"
            value={values.sex}
            onChange={handleInputChange}
            className="register-input"
          >
            <option value="">Selecione</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>

          <div className="register-button-container">
            <button
              type="button"
              onClick={handleRegister}
              className="register-button"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DogRegister;
