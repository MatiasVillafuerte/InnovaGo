import { useState } from "react";
import { addProducto, getCurrentUser, getDB, getFullEmprendimientos } from "../services/database";

export default function PanelEmprendedor() {
  const user = getCurrentUser();
  const mis = getFullEmprendimientos().filter(e => e.usuarioId === user?.id);
  const [producto, setProducto] = useState({ emprendimientoId: "", nombre: "", precio: "", tipo: "producto" });

  const guardar = e => {
    e.preventDefault();
    addProducto({ ...producto, emprendimientoId: Number(producto.emprendimientoId) });
    alert("Producto o servicio agregado.");
    window.location.reload();
  };

  return (
    <section className="section">
      <h1>Panel emprendedor</h1>
      <p className="lead">Administra tus emprendimientos, productos y servicios.</p>

      <div className="cards three">
        {mis.map(e => <div className="card" key={e.id}><h3>{e.nombre}</h3><p>{e.estado}</p><p>{e.descripcion}</p></div>)}
      </div>

      <form className="form-card small-form" onSubmit={guardar}>
        <h2>Agregar producto o servicio</h2>
        <select value={producto.emprendimientoId} onChange={e => setProducto({...producto, emprendimientoId: e.target.value})} required>
          <option value="">Seleccionar emprendimiento</option>
          {mis.map(e => <option value={e.id} key={e.id}>{e.nombre}</option>)}
        </select>
        <input placeholder="Nombre" value={producto.nombre} onChange={e => setProducto({...producto, nombre: e.target.value})} required />
        <input placeholder="Precio" value={producto.precio} onChange={e => setProducto({...producto, precio: e.target.value})} required />
        <select value={producto.tipo} onChange={e => setProducto({...producto, tipo: e.target.value})}>
          <option value="producto">Producto</option>
          <option value="servicio">Servicio</option>
        </select>
        <button>Guardar</button>
      </form>
    </section>
  );
}
