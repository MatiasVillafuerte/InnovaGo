import { useState } from "react";
import "./App.css";

import PaginaPrincipal from "./pages/PaginaPrincipal";
import CrearEmprendimiento from "./pages/CrearEmprendimiento";
import AcercaDe from "./pages/AcercaDe";

function App() {
  const [paginaActual, setPaginaActual] = useState("inicio");

  const mostrarPagina = () => {
    if (paginaActual === "crear") {
      return <CrearEmprendimiento />;
    }

    if (paginaActual === "acerca") {
      return <AcercaDe />;
    }

    return <PaginaPrincipal cambiarPagina={setPaginaActual} />;
  };

  return (
    <div className="app-emprende">
      <header className="header-emprende">
        <div className="marca">
          <div className="logo-circulo">EG</div>
          <h1>Emprende GO</h1>
        </div>

        <nav className="nav-emprende">
          <button onClick={() => setPaginaActual("inicio")}>Inicio</button>
          <button>Mapa</button>
          <button>Buscar</button>
          <button onClick={() => setPaginaActual("crear")}>
            Crear emprendimiento
          </button>
          <button onClick={() => setPaginaActual("acerca")}>Acerca de</button>
        </nav>

        <button className="btn-ingresar">Ingresar</button>
      </header>

      {mostrarPagina()}
    </div>
  );
}

export default App;