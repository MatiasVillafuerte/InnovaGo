import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmprendimiento, getCurrentUser, getDB } from "../services/database";

export default function CrearEmprendimiento() {
  const user = getCurrentUser();
  const db = getDB();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "", categoriaId: 1, descripcion: "", telefono: "",
    direccion: "", ciudad: "La Paz", lat: -16.5, lng: -68.1193,
    imagen: "", redSocial: ""
  });

  const cambiar = e => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = e => {
    e.preventDefault();
    if (!user) return alert("Primero debes iniciar sesión.");
    if (user.rol !== "emprendedor" && user.rol !== "admin") return alert("Solo emprendedores o admin pueden registrar.");
    const id = createEmprendimiento({ ...form, usuarioId: user.id });
    alert("Emprendimiento registrado. Quedará pendiente hasta que admin lo apruebe.");
    navigate(`/emprendimiento/${id}`);
  };

  return (
    <section className="create-layout">
      <div className="create-info">
        <span className="tag light">Registro</span>
        <h1>Crea tu emprendimiento</h1>
        <p>Completa el formulario y tu emprendimiento aparecerá en búsqueda y mapa.</p>
      </div>

      <form className="form-card" onSubmit={guardar}>
        <div className="two">
          <input name="nombre" placeholder="Nombre del emprendimiento" value={form.nombre} onChange={cambiar} required />
          <select name="categoriaId" value={form.categoriaId} onChange={cambiar}>
            {db.categorias.map(c => <option value={c.id} key={c.id}>{c.nombre}</option>)}
          </select>
        </div>
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={cambiar} required />
        <div className="two">
          <input name="telefono" placeholder="WhatsApp" value={form.telefono} onChange={cambiar} required />
          <input name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={cambiar} required />
        </div>
        <input name="direccion" placeholder="Dirección exacta" value={form.direccion} onChange={cambiar} required />
        <div className="two">
          <input name="lat" placeholder="Latitud" value={form.lat} onChange={cambiar} required />
          <input name="lng" placeholder="Longitud" value={form.lng} onChange={cambiar} required />
        </div>
        <input name="imagen" placeholder="URL de imagen del negocio" value={form.imagen} onChange={cambiar} />
        <input name="redSocial" placeholder="Link de Facebook / Instagram / TikTok" value={form.redSocial} onChange={cambiar} />
        <button>Guardar emprendimiento</button>
      </form>
    </section>
  );
}
