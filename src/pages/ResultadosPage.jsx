import { useSearchParams } from "react-router-dom";
import { emprendimientos } from "../data/emprendimientos";
import CardEmprendimiento from "../components/CardEmprendimiento";

export default function ResultadosPage() {
  const [params] = useSearchParams();

  const texto = params.get("q") || "";
  const categoria = params.get("categoria") || "";

  const resultados = emprendimientos.filter((item) => {
    const coincideTexto =
      texto === "" ||
      item.nombre.toLowerCase().includes(texto.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(texto.toLowerCase()) ||
      item.categoria.toLowerCase().includes(texto.toLowerCase());

    const coincideCategoria = categoria === "" || item.categoria === categoria;

    return coincideTexto && coincideCategoria;
  });

  return (
    <section>
      <div className="titulo-pagina">
        <span className="etiqueta">Resultados</span>
        <h1>Buscar emprendimientos</h1>
        <p>
          Resultados para: <strong>{texto || "todos"}</strong>
        </p>
      </div>

      <div className="bloque">
        <h2>{resultados.length} resultado(s)</h2>

        {resultados.length === 0 ? (
          <div className="vacio">
            <h3>No hay resultados</h3>
            <p>Intenta buscar otra palabra o cambiar la categoría.</p>
          </div>
        ) : (
          <div className="grid">
            {resultados.map((item) => (
              <CardEmprendimiento key={item.id} emprendimiento={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}