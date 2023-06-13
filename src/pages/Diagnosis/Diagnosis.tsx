import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosInstance } from "axios";
import "./Diagnosis.css";
import defaultPhoto from "../../figs/8000_7_10.jpg";
import MenuBar from "../MenuBar/MenuBar";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

function Diagnosis(): JSX.Element {
  const [photo, setPhoto] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [precision, setPrecision] = useState<number | null>(null); // Adicionar o estado para a precisão
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [selectedDog, setSelectedDog] = useState<string | null>(null);
  const [dogs, setDogs] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:4000/users/${userId}`)
      .then((response) => {
        setUserName(response.data.nome);
        setDogs(response.data.cachorros);
      })
      .catch((error) => {
        console.error("Erro ao obter o nome do usuário:", error);
      });
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleDogSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDog(event.target.value);
  };

  const handleSubmit = async () => {
    if (photo && selectedDog) {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("dog", selectedDog);

      try {
        const response = await api.post("/analisar-foto", formData);
        setResult(response.data.resultado);
        setPrecision(response.data.precisao); // Adicionar a precisão ao estado

        setImageUrl(URL.createObjectURL(photo));

        // Salvar o resultado no banco de dados
        const salvarDiagnosticoUrl = "http://localhost:4000/salvar-diagnostico";
        const resultado = response.data.resultado;
        const precisao = response.data.precisao; // Obter a precisão do response.data

        const salvarDiagnosticoResponse = await axios.post(
          salvarDiagnosticoUrl,
          {
            resultado,
            precisao, // Passar a precisão no objeto da requisição
            selectedDog,
            photo: photo, // Adicionar a foto aos dados da requisição
          }
        );
        console.log(
          "Resultado do diagnóstico salvo no banco de dados:",
          salvarDiagnosticoResponse.data
        );

        console.log("Resultado recebido:", response.data.resultado);
        console.log("Precisão recebida:", response.data.precisao); // Exibir a precisão no console
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getImageClassName = () => {
    if (result === "Cachorro com sarna") {
      return "dog-image dog-image-sarna";
    } else if (result === "Cachorro saudável") {
      return "dog-image dog-image-saudavel";
    }
    return "dog-image";
  };

  return (
    <div className="diagnosis-body">
      <MenuBar />
      <div className="diagnosis-container">
        <h2 className="diagnosis-title">Diagnóstico de Saúde</h2>

        {/* Dropdown para selecionar o cachorro */}
        <div className="dog-select">
          <select
            id="dog-select"
            value={selectedDog || ""}
            onChange={handleDogSelection}
          >
            <option value="" disabled>
              Selecione um cachorro
            </option>
            {dogs.map((dog) => (
              <option key={dog.id} value={dog.id}>
                {dog.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="file-input">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="join">
            <button className="choose-file-button" onClick={handleChooseFile}>
              Escolher foto
            </button>

            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={!photo || !selectedDog}
            >
              Enviar
            </button>
          </div>
        </div>

        {result && (
          <p
            className={`result ${
              result === "Cachorro saudável" ? "saudavel" : "sarna"
            }`}
          >
            {result}
          </p>
        )}
        
        {/*{precision && (
          <p className="precision">Precisão: {precision.toFixed(2)}%</p>
        )}*/}

        {imageUrl ? (
          <div className="image-container">
            <img
              src={imageUrl}
              alt="Cachorro"
              className={getImageClassName()}
            />
          </div>
        ) : (
          <div className="image-container">
            <img src={defaultPhoto} alt="Foto padrão" className="dog-image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Diagnosis;
