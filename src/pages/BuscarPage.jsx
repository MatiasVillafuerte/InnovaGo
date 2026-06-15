import { useState } from "react";
import { categorias, emprendimientos } from "../data/emprendimientos";
import CardEmprendimiento from "../components/CardEmprendimiento";

export default function BuscarPage() {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const filtrados = emprendimientos.filter((item) => {
    const coincideTexto =
      texto.trim() === "" ||
      item.nombre.toLowerCase().includes(texto.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(texto.toLowerCase()) ||
      item.categoria.toLowerCase().includes(texto.toLowerCase());

    const coincideCategoria = categoria === "Todos" || item.categoria === categoria;

    return coincideTexto && coincideCategoria;
  });

  return (
    <section>
      <div className="home-catalogo-hero">
        <div>
          <span className="etiqueta">EmprendeGO</span>
          <h1>Catálogo de emprendimientos</h1>
          <p>
            Encuentra negocios locales, revisa sus productos y contacta por WhatsApp.
          </p>
        </div>

        <div className="home-buscador">
          <input
            type="text"
            placeholder="Buscar emprendimiento..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>
      </div>

      <div className="filtros-catalogo">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={categoria === cat ? "activo" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="empr-grid-catalogo">
        {filtrados.map((item) => (
          <CardEmprendimiento key={item.id} emprendimiento={item} />
        ))}
      </div>
    </section>
  );
}