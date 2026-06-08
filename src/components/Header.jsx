import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-icono">E</span>
        <span>EmprendeGO</span>
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