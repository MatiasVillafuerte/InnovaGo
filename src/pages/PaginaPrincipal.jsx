function PaginaPrincipal({ cambiarPagina }) {
  return (
    <main className="contenido">
      <section className="hero-principal">
        <div className="hero-texto">
          <h2>Impulsa y encuentra emprendimientos locales</h2>

          <p>
            Una plataforma formal para registrar, buscar y ubicar
            emprendimientos mediante mapa interactivo.
          </p>

          <div className="botones-hero">
            <button className="btn-verde">Explorar mapa</button>

            <button
              className="btn-blanco"
              onClick={() => cambiarPagina("crear")}
            >
              Crear emprendimiento
            </button>
          </div>
        </div>

        <div className="mapa-visual">
          <div className="mapa-interno">
            <div className="mapa-dibujo">
              <div className="ruta ruta-uno"></div>
              <div className="ruta ruta-dos"></div>
              <div className="pin pin-uno"></div>
              <div className="pin pin-dos"></div>
              <div className="pin pin-tres"></div>
            </div>

            <p className="mapa-titulo">Mapa de emprendimientos locales</p>
          </div>
        </div>
      </section>

      <section className="beneficios">
        <div className="card-beneficio">
          <div className="icono">⌖</div>
          <div>
            <h3>Ubicación precisa</h3>
            <p>Cada emprendedor registra su punto en el mapa.</p>
          </div>
        </div>

        <div className="card-beneficio">
          <div className="icono">⌕</div>
          <div>
            <h3>Búsqueda rápida</h3>
            <p>Filtra por categoría, nombre o zona.</p>
          </div>
        </div>

        <div className="card-beneficio">
          <div className="icono">★</div>
          <div>
            <h3>Perfil formal</h3>
            <p>Muestra datos, redes, productos y reseñas.</p>
          </div>
        </div>
      </section>

      <h2 className="titulo-seccion">Categorías destacadas</h2>

      <section className="categorias">
        <div className="card-categoria">
          <div className="icono">🍽</div>
          <div>
            <h3>Gastronomía</h3>
            <p>Emprendimientos activos</p>
          </div>
        </div>

        <div className="card-categoria">
          <div className="icono">✦</div>
          <div>
            <h3>Artesanías</h3>
            <p>Emprendimientos activos</p>
          </div>
        </div>

        <div className="card-categoria">
          <div className="icono">⚙</div>
          <div>
            <h3>Servicios</h3>
            <p>Emprendimientos activos</p>
          </div>
        </div>

        <div className="card-categoria">
          <div className="icono">▣</div>
          <div>
            <h3>Tecnología</h3>
            <p>Emprendimientos activos</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PaginaPrincipal;