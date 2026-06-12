function AcercaDe() {
  return (
    <section className="pagina">
      <h1>Acerca de EmprendeGO</h1>

      <p>
        EmprendeGO es una plataforma diseñada para apoyar a emprendedores
        bolivianos, brindándoles una herramienta moderna para promocionar sus
        negocios y conectar con potenciales clientes.
      </p>

      <br />

      <div className="grid-cards">
        <div className="card">
          <h3>Nuestra misión</h3>
          <p>
            Impulsar el crecimiento de los emprendimientos locales mediante la
            tecnología, facilitando la visibilidad y el acceso a nuevas
            oportunidades.
          </p>
        </div>

        <div className="card">
          <h3>Nuestra visión</h3>
          <p>
            Convertirnos en la plataforma de referencia para la búsqueda,
            promoción y desarrollo de emprendimientos en Bolivia.
          </p>
        </div>

        <div className="card">
          <h3>¿Qué ofrecemos?</h3>
          <p>
            Directorio de emprendimientos, búsqueda avanzada, ubicación en
            mapas, promoción digital y herramientas para el crecimiento de los
            negocios.
          </p>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ color: "#243b2f", marginBottom: "15px" }}>
          Equipo de desarrollo
        </h2>

        <p>
          Este proyecto fue desarrollado como parte de la plataforma
          EmprendeGO, con el objetivo de fomentar el emprendimiento y la
          innovación mediante soluciones digitales accesibles para todos.
        </p>
      </div>
    </section>
  );
}

export default AcercaDe;