import { getDB, saveDB, getFullEmprendimientos, resetDB } from "../services/database";

export default function PanelAdmin() {
  const db = getDB();
  const lista = getFullEmprendimientos();

  const cambiarEstado = (id, estado) => {
    const nuevo = getDB();
    nuevo.emprendimientos = nuevo.emprendimientos.map(e => e.id === id ? { ...e, estado } : e);
    saveDB(nuevo);
    window.location.reload();
  };

  const reiniciar = () => {
    if (confirm("¿Reiniciar la base local?")) {
      resetDB();
      window.location.reload();
    }
  };

  return (
    <section className="section">
      <h1>Panel administrador</h1>
      <p className="lead">Gestiona usuarios, categorías, emprendimientos, ventas y reseñas.</p>
      <button className="btn-outline" onClick={reiniciar}>Reiniciar base local</button>

      <div className="admin-grid">
        <div className="card"><h3>Usuarios</h3><b>{db.usuarios.length}</b></div>
        <div className="card"><h3>Emprendimientos</h3><b>{db.emprendimientos.length}</b></div>
        <div className="card"><h3>Ventas</h3><b>{db.ventas.length}</b></div>
        <div className="card"><h3>Reseñas</h3><b>{db.resenas.length}</b></div>
      </div>

      <h2>Emprendimientos</h2>
      <div className="table">
        <div><b>Nombre</b><b>Categoría</b><b>Estado</b><b>Acciones</b></div>
        {lista.map(e => (
          <div key={e.id}>
            <span>{e.nombre}</span>
            <span>{e.categoria?.nombre}</span>
            <span>{e.estado}</span>
            <span>
              <button onClick={() => cambiarEstado(e.id, "aprobado")}>Aprobar</button>
              <button className="danger" onClick={() => cambiarEstado(e.id, "rechazado")}>Rechazar</button>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
