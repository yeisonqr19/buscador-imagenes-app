import React, { useState, useEffect } from "react";
import { Form } from "./components/Form";
import styled from "@emotion/styled";
import { peticionFetch } from "./helpers/helpers";
import { ListaImagenes } from "./components/ListaImagenes";

const P = styled.p`
  margin: 0 0 1rem 0;
`;

const App = () => {
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    if (busqueda === "") return null;

    const url = `https://pixabay.com/api/?key=20781017-5be133d5837e2e1682af2e4bd&q=${encodeURI(
      busqueda
    )}&per_page=30&page=${paginaActual}`;

    const data = peticionFetch(url);

    data.then((imagenes) => {
      const calcularTotalPaginas = Math.ceil(imagenes.totalHits / 30);

      setTotalPaginas(calcularTotalPaginas);
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });

      setImagenes(imagenes.hits);
    });
  }, [busqueda, paginaActual]);

  const handleBackPage = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return null;

    setPaginaActual(nuevaPaginaActual);
  };

  const handleNextPage = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas) return null;

    setPaginaActual(nuevaPaginaActual);
  };

  const botonAtras =
    paginaActual > 1 ? (
      <button
        type="button"
        className="bbtn btn-info mr-1"
        onClick={handleBackPage}
      >
        Anterior &laquo;
      </button>
    ) : null;

  const botonSiguiente =
    paginaActual < totalPaginas ? (
      <button type="button" className="bbtn btn-info" onClick={handleNextPage}>
        Siguiente &raquo;
      </button>
    ) : null;

  return (
    <div className="container">
      <div className="jumbotron">
        <P className="lead text-center">Buscador De Imagenes</P>

        <Form setBusqueda={setBusqueda} />
      </div>

      <div className="row justify-content-center">
        <ListaImagenes imagenes={imagenes} />

        {botonAtras}
        {botonSiguiente}
      </div>
    </div>
  );
};
export default App;
