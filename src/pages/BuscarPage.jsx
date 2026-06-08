import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categorias, emprendimientos } from "../data/emprendimientos";
import CardEmprendimiento from "../components/CardEmprendimiento";

export default function BuscarPage() {
  const navigate = useNavigate();
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  function buscar(e) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (texto.trim() !== "") {
      params.append("q", texto);
    }

    if (categoria !== "Todos") {
      params.append("categoria", categoria);
    }

    navigate(`/resultados?${params.toString()}`);
  }

  return (
    <section>
      <div className="hero">
        <div>
          <span className="etiqueta">Busca emprendimientos</span>
          <h1>Encuentra negocios locales cerca de ti</h1>
          <p>
            Explora emprendimientos por categoría, ubicación y recomendaciones.
            Esta pantalla corresponde al módulo de búsqueda del usuario.
          </p>

          <form className="buscador" onSubmit={buscar}>
            <input
              type="text"
              placeholder="Buscar flores, comida, ropa, tecnología..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />

            <button type="submit">Buscar</button>
          </form>
        </div>

        <div className="hero-card">
          <h3>Recomendados para ti</h3>
          <p>Encuentra negocios locales de forma rápida y sencilla.</p>
          <button onClick={() => navigate("/mapa")}>Ver mapa</button>
        </div>
      </div>

      <div className="bloque">
        <h2>Categorías destacadas</h2>

        <div className="categorias">
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
      </div>

      <div className="bloque">
        <div className="titulo-linea">
          <div>
            <span className="etiqueta">Emprendimientos</span>
            <h2>Destacados para ti</h2>
          </div>

          <button className="btn-texto" onClick={buscar}>
            Ver todos
          </button>
        </div>

        <div className="grid">
          {emprendimientos.map((item) => (
            <CardEmprendimiento key={item.id} emprendimiento={item} />
          ))}
        </div>
      </div>
    </section>
  );
}