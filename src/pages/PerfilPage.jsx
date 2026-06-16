import { useState } from "react";
import {
  FaHistory,
  FaMapMarkerAlt,
  FaPen,
  FaSave,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { usuario } from "../data/emprendimientos";

export default function PerfilPage() {
  const [ubicacion, setUbicacion] = useState(usuario.ubicacion);
  const [editandoUbicacion, setEditandoUbicacion] = useState(false);

  function obtenerUbicacionActual() {
    if (!navigator.geolocation) {
      alert("Tu navegador no permite obtener ubicación.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUbicacion(
          `Lat: ${position.coords.latitude.toFixed(5)}, Lng: ${position.coords.longitude.toFixed(5)}`
        );
      },
      () => {
        alert("No se pudo obtener tu ubicación.");
      }
    );
  }

  return (
    <section>
      <div className="perfil-hero">
        <div className="perfil-avatar-grande">
          <FaUser />
        </div>

        <div>
          <span className="etiqueta">Mi perfil</span>
          <h1>{usuario.nombre}</h1>
          <p>{usuario.correo}</p>
          <p>{usuario.telefono}</p>
        </div>
      </div>

      <div className="perfil-grid">
        <div className="perfil-panel">
          <div className="perfil-panel-head">
            <h2>
              <FaMapMarkerAlt /> Ubicación del usuario
            </h2>

            <button onClick={() => setEditandoUbicacion(!editandoUbicacion)}>
              {editandoUbicacion ? <FaSave /> : <FaPen />}
              {editandoUbicacion ? "Guardar" : "Editar"}
            </button>
          </div>

          {editandoUbicacion ? (
            <input
              className="input-perfil"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              placeholder="Escribe tu ubicación"
            />
          ) : (
            <p className="ubicacion-texto">{ubicacion}</p>
          )}

          <button className="btn-ubicacion" onClick={obtenerUbicacionActual}>
            Usar ubicación actual de la laptop
          </button>
        </div>

        <div className="perfil-panel">
          <h2>
            <FaStar /> Mis reseñas
          </h2>

          <div className="perfil-lista">
            {usuario.resenas.map((resena) => (
              <div className="perfil-resena-card" key={resena.id}>
                <div>
                  <h3>{resena.emprendimiento}</h3>
                  <span>{"★".repeat(resena.calificacion)}</span>
                </div>

                <p>{resena.comentario}</p>
                <small>{resena.fecha}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="perfil-panel historial-panel">
        <h2>
          <FaHistory /> Historial de compras
        </h2>

        <div className="historial-grid">
          {usuario.historial_compras.map((compra) => (
            <div className="historial-card" key={compra.id}>
              <img src={compra.imagen} alt={compra.producto} />

              <div>
                <span className="estado-compra">{compra.estado}</span>
                <h3>{compra.producto}</h3>
                <p>{compra.emprendimiento}</p>
                <small>{compra.fecha}</small>
              </div>

              <strong>Bs {compra.total}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}