import { resenas } from "../../data/emprendimientos";

export default function ResenasPage() {
  return (
    <section>
      <div className="titulo-pagina">
        <span className="etiqueta">Usuario</span>
        <h1>Mis reseñas</h1>
        <p>Opiniones que el usuario dejó en emprendimientos.</p>
      </div>

      <div className="lista-resenas">
        {resenas.map((item) => (
          <div className="resena" key={item.id}>
            <div>
              <h3>{item.emprendimiento}</h3>
              <span>{"★".repeat(item.calificacion)}</span>
            </div>

            <p>{item.comentario}</p>
          </div>
        ))}
      </div>
    </section>
  );
}