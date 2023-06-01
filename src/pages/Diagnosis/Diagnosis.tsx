import React, { useState, useRef } from "react";
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (photo) {
      const formData = new FormData();
      formData.append("photo", photo);

      try {
        const response = await api.post("/analisar-foto", formData);
        setResult(response.data.resultado);
        setImageUrl(URL.createObjectURL(photo));

        console.log("Resultado recebido:", response.data.resultado);
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
        <div className="file-input">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="choose-file-container">
            <button className="choose-file-button" onClick={handleChooseFile}>
              Escolher foto
            </button>
          </div>
        </div>
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleSubmit}>
            Enviar
          </button>
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
