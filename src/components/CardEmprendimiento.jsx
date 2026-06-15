import { Link } from "react-router-dom";
import { FaEye, FaWhatsapp } from "react-icons/fa";
import LogoEmprendimiento from "./LogoEmprendimiento";

export default function CardEmprendimiento({ emprendimiento }) {
  return (
    <article className="empr-card-catalogo">
      <div className="empr-card-logo">
        <LogoEmprendimiento categoria={emprendimiento.categoria} size="lg" />
      </div>

      <div className="empr-card-info">
        <span>{emprendimiento.categoria}</span>
        <h3>{emprendimiento.nombre}</h3>
        <p>{emprendimiento.descripcion}</p>
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