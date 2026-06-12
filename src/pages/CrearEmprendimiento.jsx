function CrearEmprendimiento() {
  return (
    <section className="pagina">
      <h1>Crear tu emprendimiento</h1>
      <p>Registra tu negocio para que más personas puedan encontrarte.</p>

      <form className="login-card">
        <input type="text" placeholder="Nombre del emprendimiento" />
        <input type="text" placeholder="Categoría" />
        <input type="text" placeholder="Zona o ciudad" />
        <input type="text" placeholder="Dirección exacta" />
        <input type="tel" placeholder="WhatsApp o teléfono" />
        <textarea rows="5" placeholder="Descripción del emprendimiento"></textarea>

        <button type="button">Registrar emprendimiento</button>
      </form>
    </section>
  );
}

export default CrearEmprendimiento;