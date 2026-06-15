import { emprendimientos } from "../data/emprendimientos";
import CardEmprendimiento from "../components/CardEmprendimiento";

export default function FavoritosPage() {
  const favoritos = emprendimientos.slice(0, 2);

  return (
    <section>
      <div className="titulo-pagina">
        <span className="etiqueta">Usuario</span>
        <h1>Mis favoritos</h1>
        <p>Emprendimientos guardados por el usuario.</p>
      </div>

      <div className="grid">
        {favoritos.map((item) => (
          <CardEmprendimiento key={item.id} emprendimiento={item} />
        ))}
      </div>
    </section>
  );
}