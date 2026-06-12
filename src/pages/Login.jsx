function Login() {
  return (
    <section className="pagina login-page">
      <div className="login-card">
        <h1>Iniciar sesión</h1>
        <p>Accede para registrar o administrar tu emprendimiento.</p>

        <form>
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <button type="button">Ingresar</button>
        </form>

        <p className="texto-pequeno">¿No tienes cuenta? Registra tu emprendimiento.</p>
      </div>
    </section>
  );
}

export default Login;