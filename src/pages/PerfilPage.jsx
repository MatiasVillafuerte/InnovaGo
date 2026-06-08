import { usuario } from "../data/emprendimientos";

export default function PerfilPage() {
  return (
    <section>
      <div className="titulo-pagina">
        <span className="etiqueta">Usuario</span>
        <h1>Mi perfil</h1>
        <p>Información básica del cliente registrado en EmprendeGO.</p>
      </div>

      <div className="perfil-card">
        <div className="avatar">{usuario.nombre.charAt(0)}</div>

        <div>
          <h2>{usuario.nombre}</h2>
          <p>{usuario.correo}</p>
          <p>{usuario.telefono}</p>
          <p>{usuario.ciudad}</p>
        </div>
      </div>

      <div className="estadisticas">
        <div>
          <strong>Favoritos</strong>
          <span>2 guardados</span>
        </div>

        <div>
          <strong>Reseñas</strong>
          <span>2 publicadas</span>
        </div>

        <div>
          <strong>Ciudad</strong>
          <span>{usuario.ciudad}</span>
        </div>
      </div>
    </section>
  );
}