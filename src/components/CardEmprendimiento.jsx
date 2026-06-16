import { Link } from "react-router-dom";
import { FaEye, FaWhatsapp, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import LogoEmprendimiento from "./LogoEmprendimiento";

export default function CardEmprendimiento({ emprendimiento }) {
  return (
    <article className="empr-card-catalogo">
      <div className="empr-card-logo">
        <LogoEmprendimiento emprendimiento={emprendimiento} size="lg" />
      </div>

      <div className="empr-card-info">
        <span>{emprendimiento.categoria}</span>
        <h3>{emprendimiento.nombre}</h3>
        <p>{emprendimiento.descripcion}</p>

        <div className="empr-card-meta">
          <small>
            <FaStar /> {emprendimiento.calificacion}
          </small>

          <small>
            <FaMapMarkerAlt /> {emprendimiento.direccion}
          </small>
        </div>
      </div>

      <div className="empr-card-actions">
        <a
          href={`https://wa.me/${emprendimiento.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="btn-card-comprar"
        >
          <FaWhatsapp />
          COMPRAR
        </a>

        <Link to={`/emprendimiento/${emprendimiento.id}`} className="btn-card-ver">
          <FaEye />
          VER
        </Link>
      </div>
    </article>
  );
}