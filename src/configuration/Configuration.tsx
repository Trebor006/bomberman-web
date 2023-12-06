import React, { ChangeEventHandler, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./configuration.css";

interface ConfigurationState {
  limite: string;
  medida: string;
}

const Configuration: React.FC = () => {
  const [config, setConfig] = useState<ConfigurationState>({
    limite: "",
    medida: "semanas",
  });

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    let value: string | number = event.target.value;

    if (event.target.name === "limite") {
      value = Math.max(1, Math.min(30, parseInt(value)));
    }

    setConfig({ ...config, [event.target.name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/configuraciones/registrar",
        config
      );
      toast.success("Configuración guardada exitosamente");
    } catch (error) {
      toast.error("Error al guardar la configuración");
    }
  };

  return (
    <div className="configuration">
      <h1>Configuración</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Límite:</label>
          <input
            type="number"
            name="limite"
            value={config.limite}
            onChange={handleInputChange}
            className="form-control"
            min="1"
            max="30"
            step="1"
          />
        </div>
        <div className="form-group">
          <label>Opción:</label>
          <select
            name="medida"
            value={config.medida}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="semanas">Semanas</option>
            <option value="dias">Días</option>
            <option value="horas">Horas</option>
            <option value="minutos">Minutos</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Configuration;
