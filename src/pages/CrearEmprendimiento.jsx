function CrearEmprendimiento() {
  return (
    <main className="contenido">
      <section className="encabezado-pagina">
        <h2>Cómo crear tu emprendimiento</h2>
        <p>Guía clara para registrar tu negocio y aparecer en el mapa.</p>
      </section>

      <section className="pasos-grid">
        <div className="card-paso">
          <div className="numero-paso">1</div>
          <h3>Regístrate</h3>
          <p>Crea tu cuenta como emprendedor.</p>
        </div>

        <div className="card-paso">
          <div className="numero-paso">2</div>
          <h3>Completa tu perfil</h3>
          <p>Agrega nombre, descripción, categoría y redes.</p>
        </div>

        <div className="card-paso">
          <div className="numero-paso">3</div>
          <h3>Marca tu ubicación</h3>
          <p>Guarda el punto exacto en el mapa.</p>
        </div>

        <div className="card-paso">
          <div className="numero-paso">4</div>
          <h3>Publica tus productos</h3>
          <p>Sube imágenes, precios y detalles.</p>
        </div>
      </section>

      <button className="btn-registro">Empezar registro</button>
    </main>
  );
}

export default CrearEmprendimiento;