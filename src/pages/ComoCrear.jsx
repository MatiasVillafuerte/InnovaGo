import { Link } from "react-router-dom";

export default function ComoCrear() {
  return (
    <section className="section">
      <span className="tag">Guía rápida</span>
      <h1>Cómo crear tu emprendimiento</h1>
      <p className="lead">Sigue estos pasos para registrar tu negocio dentro de la plataforma.</p>

      <div className="steps">
        <div><b>1</b><h3>Crea una cuenta</h3><p>Regístrate como emprendedor desde el login.</p></div>
        <div><b>2</b><h3>Completa tus datos</h3><p>Agrega nombre, categoría, descripción, teléfono y redes sociales.</p></div>
        <div><b>3</b><h3>Marca tu ubicación</h3><p>Ingresa latitud y longitud para aparecer en el mapa.</p></div>
        <div><b>4</b><h3>Publica productos</h3><p>Desde tu panel puedes agregar productos o servicios.</p></div>
      </div>

      <Link to="/crear" className="btn-primary center-btn">Crear ahora</Link>
    </section>
  );
}
