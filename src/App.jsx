import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "./services/database";
import PaginaPrincipal from "./pages/PaginaPrincipal";
import AcercaDe from "./pages/AcercaDe";
import ComoCrear from "./pages/ComoCrear";
import CrearEmprendimiento from "./pages/CrearEmprendimiento";
import MapaEmprendimientos from "./pages/MapaEmprendimientos";
import BuscarEmprendimientos from "./pages/BuscarEmprendimientos";
import Login from "./pages/Login";
import PanelUsuario from "./pages/PanelUsuario";
import PanelEmprendedor from "./pages/PanelEmprendedor";
import PanelAdmin from "./pages/PanelAdmin";
import DetalleEmprendimiento from "./pages/DetalleEmprendimiento";

function Navbar() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const salir = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span>EG</span>
        <strong>Emprende GO</strong>
      </Link>

      <nav>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/mapa">Mapa</NavLink>
        <NavLink to="/buscar">Buscar</NavLink>
        <NavLink to="/como-crear">Cómo crear</NavLink>
        <NavLink to="/crear">Crear emprendimiento</NavLink>
        <NavLink to="/acerca">Acerca de</NavLink>
      </nav>

      {user ? (
        <div className="user-box">
          <Link
            className="btn-mini"
            to={
              user.rol === "admin"
                ? "/admin"
                : user.rol === "emprendedor"
                ? "/emprendedor"
                : "/usuario"
            }
          >
            {user.nombre}
          </Link>
          <button onClick={salir} className="btn-outline">
            Salir
          </button>
        </div>
      ) : (
        <Link to="/login" className="btn-primary">
          Ingresar
        </Link>
      )}
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/acerca" element={<AcercaDe />} />
        <Route path="/como-crear" element={<ComoCrear />} />
        <Route path="/crear" element={<CrearEmprendimiento />} />
        <Route path="/mapa" element={<MapaEmprendimientos />} />
        <Route path="/buscar" element={<BuscarEmprendimientos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuario" element={<PanelUsuario />} />
        <Route path="/emprendedor" element={<PanelEmprendedor />} />
        <Route path="/admin" element={<PanelAdmin />} />
        <Route
          path="/emprendimiento/:id"
          element={<DetalleEmprendimiento />}
        />
      </Routes>

      <footer className="footer">
        <b>Emprende GO</b>
        <span>Plataforma de emprendimientos locales en Bolivia.</span>
      </footer>
    </BrowserRouter>
  );
}