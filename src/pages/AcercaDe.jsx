function AcercaDe() {
  return (
    <main className="contenido">
      <section className="acerca-contenido">
        <h2>Acerca de Emprende GO</h2>

        <p>
          Emprende GO es una plataforma creada para visibilizar emprendimientos
          locales y facilitar que los usuarios los encuentren mediante un mapa
          interactivo.
        </p>
      </section>

      <section className="acerca-cards">
        <div className="card-mision">
          <h3>Nuestra misión</h3>
          <p>
            Conectar emprendedores con clientes de forma sencilla, formal y
            organizada.
          </p>
        </div>

        <div className="card-valores">
          <h3>Valores</h3>

          <ul>
            <li>• Apoyo al comercio local</li>
            <li>• Acceso fácil a información</li>
            <li>• Innovación para emprendedores</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default AcercaDe;