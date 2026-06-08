import { Link } from "react-router-dom";

export default function CardEmprendimiento({ emprendimiento }) {
  return (
    <article className="card">
      <img src={emprendimiento.imagen} alt={emprendimiento.nombre} />

      <div className="card-body">
        <div className="card-top">
          <span className="categoria">{emprendimiento.categoria}</span>
          <span className="rating">★ {emprendimiento.calificacion}</span>
        </div>

        <h3>{emprendimiento.nombre}</h3>
        <p>{emprendimiento.descripcion}</p>

        <div className="card-footer">
          <span>{emprendimiento.direccion}</span>
          <Link to={`/emprendimiento/${emprendimiento.id}`}>Ver</Link>
        </div>
      </div>
    </article>
  );
}