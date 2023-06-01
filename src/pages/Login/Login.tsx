import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import MenuBar from "../MenuBar/MenuBar";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const validators: {
      [key: string]: { message: string; validate: (value: string) => boolean };
    } = {
      email: { message: "email", validate: validateEmail },
      password: { message: "password", validate: validatePassword },
    };

    const validator = validators[name];

    if (validator) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [validator.message]: "",
        login: "",
      }));

      setIsValid((prevValidations) => ({
        ...prevValidations,
        [validator.message]: validator.validate(value),
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [validator.message]: `${name === "email" ? "E" : "Senha"} inválid${
          name === "email" ? "o" : "a"
        }. ${validator.validate(value) ? "" : "Verifique novamente."}`,
      }));
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (!isValid.email || !isValid.password) {
      setErrors({
        email: !isValid.email
          ? "Email inválido. Insira um email válido, como exemplo@example.com"
          : "",
        password: !isValid.password
          ? "Senha inválida. A senha deve conter no mínimo 5 caracteres, pelo menos uma letra e pelo menos três números."
          : "",
        login: "Os campos estão inválidos. Verifique novamente.",
      });
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      login: "",
    }));

    console.log("Email:", values.email);
    console.log("Senha:", values.password);

    // Verificar os dados no banco de dados
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({
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
          throw new Error("Erro ao fazer login");
        }
      })
      .then((data) => {
        console.log(data);
        // Lógica para redirecionar para a página principal após o login bem-sucedido
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          login: "Email ou senha inválidos. Verifique novamente.",
        }));
      });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9].*[0-9].*[0-9]).{5,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUpClick = () => {
    // Lógica para redirecionar para a página de cadastro
    navigate("/cadastro");
  };

  return (
    <div className="login-body">
      <MenuBar />
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form>
          <label className="login-label">Email: </label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            className={isValid.email ? "login-input valid" : "login-input"}
          />
          {errors.email && !isValid.email && (
            <p className="login-error">{errors.email}</p>
          )}

          <label className="login-label">Senha:</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            className={isValid.password ? "login-input valid" : "login-input"}
          />
          {errors.password && !isValid.password && (
            <p className="login-error">{errors.password}</p>
          )}

          <div className="login-button-container">
            <button
              type="button"
              onClick={handleLogin}
              className="login-button"
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={handleSignUpClick}
              className="login-button"
            >
              Criar uma conta
            </button>
          </div>

          {errors.login && <p className="login-error">{errors.login}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
