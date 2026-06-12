import { useParams } from "react-router-dom";
import { useState } from "react";
import { addResena, addVenta, getCurrentUser, getFullEmprendimientos } from "../services/database";

export default function DetalleEmprendimiento() {
  const { id } = useParams();
  const user = getCurrentUser();
  const emp = getFullEmprendimientos().find(e => e.id === Number(id));
  const [resena, setResena] = useState({ comentario: "", calificacion: 5 });

  if (!emp) return <section className="section"><h1>No encontrado</h1></section>;

  const comprar = producto => {
    if (!user) return alert("Debes iniciar sesión.");
    addVenta({ usuarioId: user.id, emprendimientoId: emp.id, productoId: producto.id, total: producto.precio });
    alert("Venta registrada correctamente.");
  };

  const enviarResena = e => {
    e.preventDefault();
    if (!user) return alert("Debes iniciar sesión.");
    addResena({ ...resena, usuarioId: user.id, emprendimientoId: emp.id, calificacion: Number(resena.calificacion) });
    alert("Reseña agregada.");
    window.location.reload();
  };

  return (
    <section className="detail">
      <img className="cover" src={emp.imagen} alt={emp.nombre} />
      <div className="detail-content">
        <span className="tag">{emp.categoria?.nombre}</span>
        <h1>{emp.nombre}</h1>
        <p className="lead">{emp.descripcion}</p>
        <p><b>Teléfono:</b> {emp.telefono}</p>
        <p><b>Dirección:</b> {emp.ubicacion?.direccion}, {emp.ubicacion?.ciudad}</p>
        <a className="btn-primary" href={`https://wa.me/591${emp.telefono}`} target="_blank">Contactar por WhatsApp</a>

        <h2>Productos o servicios</h2>
        <div className="cards three">
          {emp.productos.map(p => (
            <div className="card" key={p.id}>
              <h3>{p.nombre}</h3>
              <p>{p.tipo}</p>
              <b>{p.precio} Bs</b>
              <button onClick={() => comprar(p)}>Registrar compra</button>
            </div>
          ))}
        </div>

        <h2>Reseñas</h2>
        <div className="cards two">
          {emp.resenas.map(r => <div className="card" key={r.id}><h3>{"⭐".repeat(r.calificacion)}</h3><p>{r.comentario}</p></div>)}
        </div>

        <form className="form-card small-form" onSubmit={enviarResena}>
          <h3>Agregar reseña</h3>
          <select value={resena.calificacion} onChange={e => setResena({...resena, calificacion: e.target.value})}>
            <option value="5">5 estrellas</option><option value="4">4 estrellas</option><option value="3">3 estrellas</option><option value="2">2 estrellas</option><option value="1">1 estrella</option>
          </select>
          <textarea placeholder="Comentario" value={resena.comentario} onChange={e => setResena({...resena, comentario: e.target.value})} required />
          <button>Enviar reseña</button>
        </form>
      </div>
    </section>
  );
}
