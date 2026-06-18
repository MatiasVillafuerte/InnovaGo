import { Link } from "react-router-dom";
import { User, MapPin, Package, MessageSquare, Rocket, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const steps = [
  {
    number: 1,
    icon: User,
    title: "Registro de usuario",
    description: "Crea tu cuenta en InnovaGO seleccionando el rol de emprendedor. Completa tu perfil con información personal y de contacto.",
    details: [
      "Ingresa tu nombre completo",
      "Agrega tu correo electrónico",
      "Configura una contraseña segura",
      "Verifica tu cuenta"
    ]
  },
  {
    number: 2,
    icon: MapPin,
    title: "Creación de perfil emprendedor",
    description: "Configura tu perfil de emprendedor con la información de tu negocio, ubicación y datos de contacto.",
    details: [
      "Nombre del emprendimiento",
      "Categoría de negocio",
      "Descripción detallada",
      "Ubicación en el mapa (latitud/longitud)",
      "Teléfono y WhatsApp",
      "Redes sociales"
    ]
  },
  {
    number: 3,
    icon: Package,
    title: "Publicación de emprendimiento",
    description: "Registra tu negocio en la plataforma para que los clientes puedan encontrarte y contactarte.",
    details: [
      "Sube logo y banner",
      "Agrega imágenes del negocio",
      "Define horarios de atención",
      "Configura métodos de pago",
      "Publica tu emprendimiento"
    ]
  },
  {
    number: 4,
    icon: Package,
    title: "Gestión de productos o servicios",
    description: "Agrega tus productos o servicios al catálogo con precios, descripciones e imágenes.",
    details: [
      "Crea secciones por categoría",
      "Agrega productos con fotos",
      "Define precios y tallas",
      "Describe cada producto",
      "Organiza tu inventario"
    ]
  },
  {
    number: 5,
    icon: MessageSquare,
    title: "Interacción con clientes",
    description: "Gestiona pedidos, responde preguntas y mantén comunicación directa con tus clientes.",
    details: [
      "Recibe notificaciones de pedidos",
      "Gestiona el carrito de compras",
      "Comunícate por WhatsApp",
      "Responde a reseñas",
      "Mejora tu servicio"
    ]
  }
];

export default function ComoCrear() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Guía paso a paso
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cómo crear tu emprendimiento
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Sigue estos 5 simples pasos para registrar tu negocio y comenzar a conectar con más clientes
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 to-transparent" />
              )}

              <Card className="relative hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-4 md:mb-0">
                        <step.icon className="w-8 h-8 text-primary-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {step.number}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">
                          {step.title}
                        </h2>
                      </div>

                      <p className="text-slate-600 mb-4">
                        {step.description}
                      </p>

                      <div className="bg-slate-50 rounded-lg p-4">
                        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-primary-600" />
                          Detalles:
                        </h3>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-600">
                              <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <CardContent className="p-8">
              <Rocket className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                ¿Listo para comenzar?
              </h2>
              <p className="text-slate-600 mb-6">
                Únete a miles de emprendedores que ya están creciendo con InnovaGO
              </p>
              <Link to="/crear">
                <Button size="lg" className="w-full md:w-auto">
                  <Rocket className="w-5 h-5 mr-2" />
                  Crear mi emprendimiento ahora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
