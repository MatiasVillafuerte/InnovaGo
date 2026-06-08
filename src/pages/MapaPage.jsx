import { useState } from "react";
import { Link } from "react-router-dom";
import { categorias, emprendimientos } from "../data/emprendimientos";

export default function MapaPage() {
  const [categoria, setCategoria] = useState("Todos");
  const [seleccionado, setSeleccionado] = useState(emprendimientos[0]);

  const filtrados =
    categoria === "Todos"
      ? emprendimientos
      : emprendimientos.filter((item) => item.categoria === categoria);

  function cambiarCategoria(valor) {
    setCategoria(valor);

    const nuevoFiltro =
      valor === "Todos"
        ? emprendimientos
        : emprendimientos.filter((item) => item.categoria === valor);

    setSeleccionado(nuevoFiltro[0] || null);
  }

  return (
    <section>
      <div className="titulo-pagina">
        <span className="etiqueta">Mapa</span>
        <h1>Mapa de emprendimientos</h1>
        <p>
          Visualiza negocios cercanos y abre el detalle de cada emprendimiento.
        </p>
      </div>

      <div className="mapa-layout">
        <div className="mapa">
          <div className="camino camino1"></div>
          <div className="camino camino2"></div>
          <div className="camino camino3"></div>

          {filtrados.map((item) => (
            <button
              key={item.id}
              className={
                seleccionado && seleccionado.id === item.id
                  ? "pin activo"
                  : "pin"
              }
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
              onClick={() => setSeleccionado(item)}
              title={item.nombre}
            >
              ●
            </button>
          ))}
        </div>

        <aside className="filtros-mapa">
          <h3>Filtros</h3>

          <select
            value={categoria}
            onChange={(e) => cambiarCategoria(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <h4>Emprendimientos</h4>

          {filtrados.map((item) => (
            <button
              key={item.id}
              className={
                seleccionado && seleccionado.id === item.id
                  ? "item-mapa activo"
                  : "item-mapa"
              }
              onClick={() => setSeleccionado(item)}
            >
              <strong>{item.nombre}</strong>
              <span>{item.categoria}</span>
            </button>
          ))}
        </aside>
      </div>

      {seleccionado && (
        <div className="negocio-seleccionado">
          <img src={seleccionado.imagen} alt={seleccionado.nombre} />

          <div>
            <span className="categoria">{seleccionado.categoria}</span>
            <h2>{seleccionado.nombre}</h2>
            <p>{seleccionado.descripcion}</p>
            <p>{seleccionado.direccion}</p>
          </div>

          <Link to={`/emprendimiento/${seleccionado.id}`}>Ver detalle</Link>
        </div>
      )}
    </section>
  );
}