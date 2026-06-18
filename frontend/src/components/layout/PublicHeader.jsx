import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaStore } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

export default function PublicHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="header">
      <Link to="/" className="logo-app">
        <div className="logo-app-icono">
          <FaStore />
        </div>
        <div>
          <strong>InnovaGO</strong>
          <span>Negocios locales cerca de ti</span>
        </div>
      </Link>

      <nav className="menu">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/buscar">Buscar</NavLink>
        <NavLink to="/mapa">Mapa</NavLink>
        <NavLink to="/favoritos">Favoritos</NavLink>
        <NavLink to="/como-crear">Cómo crear</NavLink>
        <NavLink to="/acerca">Acerca de</NavLink>
      </nav>

      <div className="header-actions">
        {user ? (
          <>
            <NavLink to="/perfil" className="btn-header-outline">
              {user.name || user.nombre || 'Mi perfil'}
            </NavLink>
            <button type="button" className="btn-header-outline" onClick={handleLogout}>
              Salir
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-publicar">
            Ingresar
          </Link>
        )}
        <Link to="/crear" className="btn-publicar">
          Publica tu negocio
        </Link>
      </div>
    </header>
  )
}
