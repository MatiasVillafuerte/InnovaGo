import { useState } from "react";
import { Link } from "react-router-dom";
import { getDB, getFullEmprendimientos, getCurrentUser, toggleFavorito } from "../services/database";

export default function BuscarEmprendimientos() {
  const db = getDB();
  const user = getCurrentUser();
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const lista = getFullEmprendimientos().filter(e => e.estado === "aprobado" || user?.rol === "admin");
  const filtrados = lista.filter(e => {
    const total = `${e.nombre} ${e.descripcion} ${e.categoria?.nombre} ${e.ubicacion?.ciudad}`.toLowerCase();
    return total.includes(texto.toLowerCase()) && (categoria === "Todas" || e.categoria?.nombre === categoria);
  });

  const fav = id => {
    if (!user) return alert("Debes iniciar sesión.");
    toggleFavorito(user.id, id);
    window.location.reload();
  };

  return (
    <section className="section">
      <span className="tag">Directorio</span>
      <h1>Buscar emprendimientos</h1>
      <div className="filters">
        <input placeholder="Buscar por nombre, ciudad, categoría..." value={texto} onChange={e => setTexto(e.target.value)} />
        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option>Todas</option>
          {db.categorias.map(c => <option key={c.id}>{c.nombre}</option>)}
        </select>
      </div>

      <div className="cards three">
        {filtrados.map(e => (
          <div className="business-card vertical" key={e.id}>
            <img src={e.imagen} alt={e.nombre} />
            <div>
              <small>{e.categoria?.icono} {e.categoria?.nombre}</small>
              <h3>{e.nombre}</h3>
              <p>{e.descripcion}</p>
              <p><b>📍</b> {e.ubicacion?.direccion}</p>
              <div className="row">
                <Link to={`/emprendimiento/${e.id}`} className="btn-mini">Ver perfil</Link>
                <button className="btn-outline" onClick={() => fav(e.id)}>♡ Favorito</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
