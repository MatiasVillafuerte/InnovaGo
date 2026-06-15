import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaBars,
  FaShoppingCart,
  FaTimes,
  FaTrash,
  FaWhatsapp,
  FaEye,
} from "react-icons/fa";
import { emprendimientos } from "../data/emprendimientos";
import LogoEmprendimiento from "../components/LogoEmprendimiento";

export default function DetalleEmprendimientoPage() {
  const { id } = useParams();

  const emprendimiento = emprendimientos.find(
    (item) => item.id === Number(id)
  );

  const [productoModal, setProductoModal] = useState(null);
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  if (!emprendimiento) {
    return (
      <div className="vacio">
        <h2>No encontrado</h2>
        <p>No se encontró el emprendimiento.</p>
        <Link to="/buscar">Volver</Link>
      </div>
    );
  }

  function abrirProducto(producto) {
    setProductoModal(producto);
    setTamanoSeleccionado(producto.tamanos?.[0] || "");
  }

  function agregarAlCarrito() {
    const item = {
      ...productoModal,
      tamano: tamanoSeleccionado,
      cantidad: 1,
      emprendimiento: emprendimiento.nombre,
      whatsapp: emprendimiento.whatsapp,
    };

    setCarrito([...carrito, item]);
    setProductoModal(null);
    setMostrarCarrito(true);
  }

  function eliminarDelCarrito(index) {
    setCarrito(carrito.filter((_, i) => i !== index));
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <section className="tienda-page">
      <header className="tienda-header">
        <button className="tienda-icon-btn">
          <FaBars />
        </button>

        <div className="tienda-marca">
          <LogoEmprendimiento categoria={emprendimiento.categoria} size="sm" />
          <span>{emprendimiento.nombre}</span>
        </div>

        <button
          className="tienda-carrito-btn"
          onClick={() => setMostrarCarrito(true)}
        >
          <FaShoppingCart />
          {carrito.length > 0 && <span>{carrito.length}</span>}
        </button>
      </header>

      <div className="tienda-banner">
        <img src={emprendimiento.banner} alt={emprendimiento.nombre} />

        <div className="tienda-banner-texto">
          <h1>{emprendimiento.nombre}</h1>
          <p>{emprendimiento.descripcion_larga}</p>
        </div>
      </div>

      {emprendimiento.secciones.map((seccion) => (
        <div className="tienda-seccion" key={seccion.titulo}>
          <div className="tienda-seccion-head">
            <h2>
              <span>{seccion.emoji}</span> {seccion.titulo}
            </h2>
            <button>Ver todo</button>
          </div>

          <div className="productos-horizontal">
            {seccion.productos.map((producto) => (
              <article className="producto-catalogo-card" key={producto.id}>
                <div className="producto-img-wrap">
                  <span className="producto-codigo">{producto.codigo}</span>
                  <img src={producto.imagen} alt={producto.nombre} />
                </div>

                <div className="producto-catalogo-info">
                  <h3>{producto.nombre}</h3>
                  <p>Desde Bs {producto.precio}</p>

                  <button onClick={() => abrirProducto(producto)}>
                    <FaEye />
                    VER
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}

      {productoModal && (
        <div className="modal-producto-overlay">
          <div className="modal-producto">
            <button
              className="modal-close"
              onClick={() => setProductoModal(null)}
            >
              <FaTimes />
            </button>

            <img
              className="modal-producto-img"
              src={productoModal.imagen}
              alt={productoModal.nombre}
            />

            <div className="modal-producto-body">
              <h2>{productoModal.nombre}</h2>
              <p>{productoModal.descripcion_larga}</p>

              <div className="modal-info-box">
                <strong>🕘 Horarios para pedidos:</strong>
                <ul>
                  <li>Lunes a sábado: 7:30 AM – 18:30 PM</li>
                  <li>Domingos y feriados: 8:30 AM – 19:30 PM</li>
                  <li>⏳ Tiempo de preparación: <b>24 horas</b></li>
                </ul>
                <small>
                  Para personalizar, añade tu nota en la pantalla del carrito.
                </small>
              </div>

              <h3>Elige una opción:</h3>

              <div className="modal-tamanos">
                {productoModal.tamanos.map((tamano) => (
                  <button
                    key={tamano}
                    className={tamanoSeleccionado === tamano ? "activo" : ""}
                    onClick={() => setTamanoSeleccionado(tamano)}
                  >
                    🎁 {tamano}
                  </button>
                ))}
              </div>

              <div className="modal-producto-footer">
                <strong>Bs {productoModal.precio}</strong>
                <button onClick={agregarAlCarrito}>
                  <FaShoppingCart />
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mostrarCarrito && (
        <div className="carrito-overlay">
          <div className="carrito-panel">
            <div className="carrito-header">
              <h2>Carrito</h2>
              <button onClick={() => setMostrarCarrito(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="carrito-contenido">
              {carrito.length === 0 ? (
                <div className="vacio">
                  <h3>Tu carrito está vacío</h3>
                  <p>Selecciona un producto del catálogo.</p>
                </div>
              ) : (
                <>
                  <div className="carrito-productos">
                    {carrito.map((item, index) => (
                      <div className="carrito-card-grande" key={index}>
                        <img src={item.imagen} alt={item.nombre} />

                        <div>
                          <span>{item.codigo}</span>
                          <h3>{item.nombre}</h3>
                          <p>{item.tamano}</p>
                          <strong>Bs {item.precio}</strong>
                        </div>

                        <button onClick={() => eliminarDelCarrito(index)}>
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="carrito-resumen">
                    <h3>Resumen</h3>

                    <div>
                      <span>Subtotal</span>
                      <strong>Bs {total}</strong>
                    </div>

                    <div>
                      <span>Delivery</span>
                      <strong>Bs 0</strong>
                    </div>

                    <div className="total">
                      <span>Total</span>
                      <strong>Bs {total}</strong>
                    </div>
                  </div>

                  <form className="carrito-form">
                    <h3>Completar compra</h3>

                    <label>Nombre Cliente</label>
                    <input type="text" />

                    <label>Celular Cliente</label>
                    <input type="text" />

                    <label>Zona de entrega</label>
                    <select>
                      <option>Seleccione zona</option>
                      <option>Centro</option>
                      <option>Norte</option>
                      <option>Sur</option>
                    </select>

                    <label>Mensaje para tarjeta</label>
                    <textarea />

                    <label>Fecha de entrega</label>
                    <input type="date" />

                    <label>Hora de entrega</label>
                    <input type="time" />

                    <label>Forma de pago</label>
                    <select>
                      <option>Seleccione forma de pago</option>
                      <option>QR</option>
                      <option>Efectivo</option>
                      <option>Transferencia</option>
                    </select>

                    <a
                      className="btn-ordenar"
                      href={`https://wa.me/${emprendimiento.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaWhatsapp />
                      Ordenar por WhatsApp
                    </a>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}