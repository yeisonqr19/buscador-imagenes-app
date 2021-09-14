import React, { useState } from "react";
import { Error } from "./Error";

export const Form = ({ setBusqueda }) => {
  const [termino, setTermino] = useState("");

  const [error, setError] = useState(false);

  const handleInputChange = ({ target }) => {
    setTermino(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (termino.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    setBusqueda(termino);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca la imagen que Quieras"
            name="busqueda"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>

      {error && <Error mensaje="Agrega un termino de Busqueda" />}
    </form>
  );
};
