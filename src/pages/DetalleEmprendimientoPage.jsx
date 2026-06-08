import { Link, useParams } from "react-router-dom";
import { emprendimientos } from "../data/emprendimientos";

export default function DetalleEmprendimientoPage() {
  const { id } = useParams();

  const emprendimiento = emprendimientos.find(
    (item) => item.id === Number(id)
  );

  if (!emprendimiento) {
    return (
      <div className="vacio">
        <h2>No encontrado</h2>
        <p>No se encontró el emprendimiento.</p>
        <Link to="/buscar">Volver</Link>
      </div>
    );
  }

  return (
    <section>
      <div className="detalle">
        <div className="detalle-imagen">
          <img src={emprendimiento.imagen} alt={emprendimiento.nombre} />
        </div>

        <div className="detalle-info">
          <span className="categoria">{emprendimiento.categoria}</span>

          <h1>{emprendimiento.nombre}</h1>

          <p>{emprendimiento.descripcion}</p>

          <div className="info">
            <span>⭐ {emprendimiento.calificacion}</span>
            <span>📍 {emprendimiento.direccion}</span>
            <span>☎ {emprendimiento.telefono}</span>
          </div>

          <a
            className="btn-principal"
            href={`https://wa.me/${emprendimiento.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            Contactar por WhatsApp
          </a>

          <Link className="btn-secundario" to="/buscar">
            Volver al catálogo
          </Link>
        </div>
      </div>

      <div className="bloque">
        <h2>Productos o servicios</h2>

        <div className="productos">
          {emprendimiento.productos.map((producto) => (
            <div className="producto" key={producto.id}>
              <img src={producto.imagen} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p>Bs {producto.precio}</p>

              <a
                href={`https://wa.me/${emprendimiento.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                Ver
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}