import { Target, Eye, Heart, Users, MapPin, TrendingUp, Award } from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Link } from "react-router-dom";

export default function AcercaDe() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Acerca de nosotros
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              InnovaGO
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Plataforma web creada para apoyar a emprendedores bolivianos, 
              ayudándoles a mostrar sus productos, servicios, ubicación, redes sociales y reseñas.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission, Vision, Objective */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Misión</h3>
              <p className="text-slate-600">
                Impulsar emprendimientos locales mediante herramientas digitales fáciles de usar, 
                conectando emprendedores con clientes potenciales.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visión</h3>
              <p className="text-slate-600">
                Ser una plataforma de referencia para buscar, registrar y promocionar negocios locales, 
                facilitando el crecimiento del ecosistema emprendedor boliviano.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Objetivo</h3>
              <p className="text-slate-600">
                Conectar clientes con emprendedores mediante mapa interactivo, búsqueda avanzada, 
                sistema de favoritos y perfiles profesionales detallados.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ¿Qué ofrecemos?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Herramientas diseñadas para potenciar tu negocio y facilitar la conexión con clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Mapa Interactivo</h3>
                <p className="text-sm text-slate-600">
                  Ubica negocios en tiempo real con geolocalización precisa
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Perfiles Profesionales</h3>
                <p className="text-sm text-slate-600">
                  Muestra tu negocio con imágenes, productos y reseñas
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Catálogo de Productos</h3>
                <p className="text-sm text-slate-600">
                  Gestiona tu inventario con precios, tallas y descripciones
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Sistema de Reseñas</h3>
                <p className="text-sm text-slate-600">
                  Construye confianza con calificaciones y comentarios
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary-400 mb-2">500+</div>
              <div className="text-slate-300">Emprendimientos registrados</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-400 mb-2">10K+</div>
              <div className="text-slate-300">Usuarios activos</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-400 mb-2">50+</div>
              <div className="text-slate-300">Categorías de negocios</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-400 mb-2">98%</div>
              <div className="text-slate-300">Satisfacción de usuarios</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                ¿Quieres ser parte de InnovaGO?
              </h2>
              <p className="text-slate-600 mb-6">
                Únete a nuestra comunidad de emprendedores y comienza a crecer hoy mismo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/crear">
                  <Button size="lg" className="w-full sm:w-auto">
                    Registrar mi negocio
                  </Button>
                </Link>
                <Link to="/como-crear">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Cómo funciona
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
