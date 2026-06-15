import { NavLink } from "react-router-dom";
import { FaStore } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-app">
        <div className="logo-app-icono">
          <FaStore />
        </div>

        <div>
          <strong>EmprendeGO</strong>
          <span>Negocios locales cerca de ti</span>
        </div>
      </div>

      <nav className="menu">
        <NavLink to="/buscar">Buscar</NavLink>
        <NavLink to="/mapa">Mapa</NavLink>
        <NavLink to="/favoritos">Favoritos</NavLink>
        <NavLink to="/perfil">Mi perfil</NavLink>
      </nav>

      <button className="btn-publicar">Publica tu negocio</button>
    </header>
  );
}