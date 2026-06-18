import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShoppingCart, X, Trash2, Eye, Menu, Clock, MapPin, Star, Phone, MessageCircle } from "lucide-react";
import { useEmprendimientos } from "../../hooks/useEmprendimientos";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "../../components/ui/Modal";

export default function DetalleEmprendimientoPage() {
  const { id } = useParams();
  const { emprendimientos, loading } = useEmprendimientos();

  const emprendimiento = emprendimientos.find(
    (item) => String(item.id) === String(id)
  );

  const [productoModal, setProductoModal] = useState(null);
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  if (loading && !emprendimiento) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="max-w-md text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Cargando...</h2>
            <p className="text-slate-600">Leyendo datos desde Firebase.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!emprendimiento) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="max-w-md text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No encontrado</h2>
            <p className="text-slate-600 mb-4">No se encontró el emprendimiento.</p>
            <Link to="/buscar">
              <Button>Volver</Button>
            </Link>
          </CardContent>
        </Card>
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/buscar" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Menu className="w-6 h-6 text-slate-600" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">{emprendimiento.categoria?.[0] || '🏪'}</span>
              </div>
              <span className="font-semibold text-slate-900">{emprendimiento.nombre}</span>
            </div>

            <button
              className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMostrarCarrito(true)}
            >
              <ShoppingCart className="w-6 h-6 text-slate-600" />
              {carrito.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {carrito.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={emprendimiento.banner || emprendimiento.imagen || emprendimiento.logo}
          alt={emprendimiento.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{emprendimiento.nombre}</h1>
            <p className="text-white/90 text-lg">{emprendimiento.descripcion_larga}</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Calificación</p>
                  <p className="text-lg font-semibold text-slate-900">{emprendimiento.calificacion} ⭐</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Ubicación</p>
                  <p className="text-lg font-semibold text-slate-900">{emprendimiento.direccion}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Contacto</p>
                  <p className="text-lg font-semibold text-slate-900">{emprendimiento.telefono}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Sections */}
        {(emprendimiento.secciones || []).map((seccion) => (
          <div key={seccion.titulo} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                <span className="mr-2">{seccion.emoji}</span>
                {seccion.titulo}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(seccion.productos || []).map((producto) => (
                <Card key={producto.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-3">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {producto.codigo}
                    </Badge>
                    <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">{producto.nombre}</h3>
                    <p className="text-sm text-slate-600 mb-3">Desde Bs {producto.precio}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => abrirProducto(producto)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {productoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setProductoModal(null)}>
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-slate-900">{productoModal.nombre}</h2>
                <button
                  onClick={() => setProductoModal(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={productoModal.imagen}
                  alt={productoModal.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-slate-600 mb-6">{productoModal.descripcion_larga}</p>

              <div className="bg-primary-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <strong className="text-slate-900">Horarios para pedidos:</strong>
                </div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Lunes a sábado: 7:30 AM – 18:30 PM</li>
                  <li>• Domingos y feriados: 8:30 AM – 19:30 PM</li>
                  <li>• Tiempo de preparación: <b>24 horas</b></li>
                </ul>
                <p className="text-xs text-slate-600 mt-2">
                  Para personalizar, añade tu nota en la pantalla del carrito.
                </p>
              </div>

              <h3 className="font-semibold text-slate-900 mb-3">Elige una opción:</h3>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {(productoModal.tamanos || ["Único"]).map((tamano) => (
                  <button
                    key={tamano}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      tamanoSeleccionado === tamano
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-slate-200 hover:border-primary-300'
                    }`}
                    onClick={() => setTamanoSeleccionado(tamano)}
                  >
                    🎁 {tamano}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-slate-900">Bs {productoModal.precio}</p>
                <Button onClick={agregarAlCarrito}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar al carrito
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cart Panel */}
      {mostrarCarrito && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm" onClick={() => setMostrarCarrito(false)}>
          <div className="w-full max-w-md bg-white h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Carrito</h2>
                <button
                  onClick={() => setMostrarCarrito(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="p-4">
              {carrito.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Tu carrito está vacío</h3>
                  <p className="text-slate-600">Selecciona un producto del catálogo.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {carrito.map((item, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <Badge variant="outline" className="mb-1 text-xs">{item.codigo}</Badge>
                              <h3 className="font-semibold text-slate-900 mb-1">{item.nombre}</h3>
                              <p className="text-sm text-slate-600 mb-1">{item.tamano}</p>
                              <p className="font-bold text-slate-900">Bs {item.precio}</p>
                            </div>
                            <button
                              onClick={() => eliminarDelCarrito(index)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-4">Resumen</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Subtotal</span>
                          <span className="font-semibold text-slate-900">Bs {total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Delivery</span>
                          <span className="font-semibold text-slate-900">Bs 0</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-200">
                          <span className="font-semibold text-slate-900">Total</span>
                          <span className="font-bold text-xl text-primary-600">Bs {total}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-4">Completar compra</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Cliente</label>
                          <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Celular Cliente</label>
                          <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Zona de entrega</label>
                          <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option>Seleccione zona</option>
                            <option>Centro</option>
                            <option>Norte</option>
                            <option>Sur</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje para tarjeta</label>
                          <textarea className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" rows="2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Fecha de entrega</label>
                          <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Hora de entrega</label>
                          <input type="time" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Forma de pago</label>
                          <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option>Seleccione forma de pago</option>
                            <option>QR</option>
                            <option>Efectivo</option>
                            <option>Transferencia</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <a
                    href={`https://wa.me/${emprendimiento.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <Button className="w-full" size="lg">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Ordenar por WhatsApp
                    </Button>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}