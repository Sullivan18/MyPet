import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import MenuBar from "../MenuBar/MenuBar";

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    registration: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const validators = {
      email: { message: "email", validate: validateEmail },
      password: { message: "password", validate: validatePassword },
    };

    const validator = validators[name];

    if (validator) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [validator.message]: "",
        registration: "",
      }));

      const isValidValue = validator.validate(value);

      setIsValid((prevValidations) => ({
        ...prevValidations,
        [validator.message]: isValidValue,
      }));

      if (name === "email") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: isValidValue
            ? ""
            : "Email inválido. Insira um email válido, como exemplo@example.com",
        }));
      } else if (name === "password") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: isValidValue
            ? ""
            : "Senha inválida. A senha deve conter no mínimo 5 caracteres, pelo menos uma letra e pelo menos três números.",
        }));
      }
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    if (!isValid.email || !isValid.password) {
      setErrors({
        email: !isValid.email
          ? "Email inválido. Insira um email válido, como exemplo@example.com"
          : "",
        password: !isValid.password
          ? "Senha inválida. A senha deve conter no mínimo 5 caracteres, pelo menos uma letra e pelo menos três números."
          : "",
        registration: "Os campos estão inválidos. Verifique novamente.",
      });

      setValues({
        name: "",
        email: "",
        password: "",
      });

      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
      registration: "",
    }));

    console.log("Nome:", values.name);
    console.log("Email:", values.email);
    console.log("Senha:", values.password);

    // Chama a função para inserir os dados no banco de dados
    fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao cadastrar");
        }
      })
      .then((data) => {
        console.log(data);
        setShowPopup(true);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar:", error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          registration: "Email já cadastrado, verifique novamente.",
        }));
      });
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9].*[0-9].*[0-9]).{5,}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    let timeoutId;

    if (showPopup) {
      timeoutId = setTimeout(() => {
        setShowPopup(false);
      }, 3000); // Fechar o popup após 3 segundos
    }

    return () => clearTimeout(timeoutId);
  }, [showPopup]);

  const renderEmailValidationMessage = () => {
    if (isValid.email) {
      return <p className="register-message valid-message">Email válido</p>;
    } else if (errors.email) {
      return <p className="register-error">{errors.email}</p>;
    }

    return null;
  };

  const renderPasswordValidationMessage = () => {
    if (isValid.password) {
      return <p className="register-message valid-message">Senha válida</p>;
    } else if (errors.password) {
      return <p className="register-error">{errors.password}</p>;
    }

    return null;
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <h1 className="register-title">Cadastro</h1>
        <form>
          <label className="register-label">Nome:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            className="register-input"
          />

          <label className="register-label">Email: </label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            className={
              isValid.email ? "register-input valid" : "register-input"
            }
          />
          {renderEmailValidationMessage()}

          <label className="register-label">Senha:</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            className={
              isValid.password ? "register-input valid" : "register-input"
            }
          />
          {renderPasswordValidationMessage()}

          <div className="register-button-container">
            <button
              type="button"
              onClick={handleRegister}
              className="register-button"
            >
              Cadastrar
            </button>
            <button
              type="button"
              onClick={handleGoToLogin}
              className="register-button"
            >
              Voltar para o Login
            </button>
          </div>

          {errors.registration && (
            <p className="register-error">{errors.registration}</p>
          )}
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <p>Cadastro realizado com sucesso!</p>
        </div>
      )}
    </div>
  );
}

export default Register;
