import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, registerUser } from "../services/database";

export default function Login() {
  const [modo, setModo] = useState("login");
  const [form, setForm] = useState({ nombre: "", correo: "", password: "", rol: "usuario" });
  const navigate = useNavigate();

  const cambiar = e => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = e => {
    e.preventDefault();
    if (modo === "login") {
      const user = login(form.correo, form.password);
      if (!user) return alert("Correo o contraseña incorrectos.");
      navigate(user.rol === "admin" ? "/admin" : user.rol === "emprendedor" ? "/emprendedor" : "/usuario");
      window.location.reload();
    } else {
      const result = registerUser(form);
      if (!result.ok) return alert(result.message);
      navigate(form.rol === "emprendedor" ? "/emprendedor" : "/usuario");
      window.location.reload();
    }
  };

  return (
    <section className="login-layout">
      <div className="login-info">
        <h1>Bienvenido a Emprende GO</h1>
        <p>Ingresa como usuario, emprendedor o administrador.</p>
        <div className="demo">
          <b>Cuentas demo:</b>
          <p>admin@emprendego.com / 123456</p>
          <p>emprendedor@demo.com / 123456</p>
          <p>usuario@demo.com / 123456</p>
        </div>
      </div>

      <form className="form-card" onSubmit={enviar}>
        <h2>{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>
        {modo === "registro" && <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={cambiar} required />}
        <input name="correo" type="email" placeholder="Correo electrónico" value={form.correo} onChange={cambiar} required />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={cambiar} required />
        {modo === "registro" && (
          <select name="rol" value={form.rol} onChange={cambiar}>
            <option value="usuario">Usuario</option>
            <option value="emprendedor">Emprendedor</option>
          </select>
        )}
        <button>{modo === "login" ? "Ingresar" : "Registrarme"}</button>
        <p className="switch" onClick={() => setModo(modo === "login" ? "registro" : "login")}>
          {modo === "login" ? "No tengo cuenta, registrarme" : "Ya tengo cuenta"}
        </p>
      </form>
    </section>
  );
}
