import { Link } from "react-router-dom";
import { getCurrentUser, getDB, getFullEmprendimientos } from "../services/database";

export default function PanelUsuario() {
  const user = getCurrentUser();
  const db = getDB();
  const favoritos = db.favoritos.filter(f => f.usuarioId === user?.id);
  const lista = getFullEmprendimientos().filter(e => favoritos.some(f => f.emprendimientoId === e.id));
  const compras = db.ventas.filter(v => v.usuarioId === user?.id);

  return (
    <section className="section">
      <h1>Panel de usuario</h1>
      <p className="lead">Bienvenido, {user?.nombre}</p>

      <h2>Mis favoritos</h2>
      <div className="cards three">
        {lista.map(e => <Link className="card" to={`/emprendimiento/${e.id}`} key={e.id}><h3>{e.nombre}</h3><p>{e.descripcion}</p></Link>)}
      </div>

      <h2>Mis compras registradas</h2>
      <div className="table">
        <div><b>Fecha</b><b>Emprendimiento</b><b>Total</b></div>
        {compras.map(v => {
          const e = getFullEmprendimientos().find(x => x.id === v.emprendimientoId);
          return <div key={v.id}><span>{v.fecha}</span><span>{e?.nombre}</span><span>{v.total} Bs</span></div>
        })}
      </div>
    </section>
  );
}
