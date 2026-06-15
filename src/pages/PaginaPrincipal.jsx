import { Link } from "react-router-dom";
import { getFullEmprendimientos } from "../services/database";

export default function PaginaPrincipal() {
  const emprendimientos = getFullEmprendimientos().slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="tag">Plataforma de emprendimientos</span>
          <h1>Impulsa y encuentra emprendimientos locales</h1>
          <p>Registra, busca, compra y ubica emprendimientos mediante un mapa interactivo y perfiles profesionales.</p>
          <div className="actions">
            <Link to="/mapa" className="btn-primary">Explorar mapa</Link>
            <Link to="/crear" className="btn-secondary">Crear emprendimiento</Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="map-illustration">📍 🛍️ ⭐</div>
          <h3>Emprendimientos cerca de ti</h3>
          <p>Mapa real, reseñas, favoritos y productos.</p>
        </div>
      </section>

      <section className="section">
        <h2>¿Qué puedes hacer?</h2>
        <div className="cards three">
          <div className="card"><span>📍</span><h3>Ubicar</h3><p>Encuentra negocios registrados en el mapa interactivo.</p></div>
          <div className="card"><span>🔎</span><h3>Buscar</h3><p>Filtra por nombre, categoría, ciudad o descripción.</p></div>
          <div className="card"><span>🚀</span><h3>Promocionar</h3><p>Crea un perfil formal para mostrar productos, redes e imágenes.</p></div>
        </div>
      </section>

      <section className="section soft">
        <h2>Emprendimientos destacados</h2>
        <div className="cards three">
          {emprendimientos.map(e => (
            <Link to={`/emprendimiento/${e.id}`} className="business-card" key={e.id}>
              <img src={e.imagen} alt={e.nombre} />
              <div>
                <small>{e.categoria?.nombre}</small>
                <h3>{e.nombre}</h3>
                <p>{e.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
