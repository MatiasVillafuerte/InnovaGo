import { Link } from 'react-router-dom'
import { useEmprendimientos } from '../../hooks/useEmprendimientos'
import { MapPin, Search, Rocket, TrendingUp, Users, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'

export default function HomePage() {
  const { emprendimientos } = useEmprendimientos()
  const destacados = emprendimientos.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItMiAyLTRzLTIgMi00IDJjMCAyIDIgMiA0IDJzMi0yIDQtMiAwLTItMi00LTJ6Ii8+PHBhdGggZD0iTTYgMzRjMC0yIDItMiAyLTRzMi0yIDQtMiAwIDIgMiA0IDIgMi0yIDQtMiAwLTItMi00LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Plataforma de emprendimientos locales
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Impulsa y encuentra{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-white">
                  emprendimientos locales
                </span>
              </h1>
              <p className="text-lg md:text-xl text-primary-100 max-w-2xl">
                Registra, busca, compra y ubica emprendimientos mediante un mapa interactivo y perfiles profesionales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/mapa">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50">
                    <MapPin className="w-5 h-5" />
                    Explorar mapa
                  </Button>
                </Link>
                <Link to="/crear">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-primary-700/50 text-white border-primary-500 hover:bg-primary-700/70">
                    <Rocket className="w-5 h-5" />
                    Crear emprendimiento
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block animate-scale-in">
              <Card variant="elevated" className="bg-white/10 backdrop-blur-lg border-white/20">
                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Emprendimientos cerca de ti</h3>
                      <p className="text-primary-200">Mapa real, reseñas, favoritos y productos</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-3xl font-bold">500+</div>
                      <div className="text-sm text-primary-200">Emprendimientos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">10K+</div>
                      <div className="text-sm text-primary-200">Usuarios</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">4.8</div>
                      <div className="text-sm text-primary-200">Calificación</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              ¿Qué puedes hacer?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Descubre todas las herramientas que InnovaGO ofrece para conectar emprendedores y clientes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                  <MapPin className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Ubicar</h3>
                <p className="text-slate-600">
                  Encuentra negocios registrados en el mapa interactivo con ubicación precisa.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                  <Search className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Buscar</h3>
                <p className="text-slate-600">
                  Filtra por nombre, categoría, ciudad o descripción para encontrar exactamente lo que buscas.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                  <Rocket className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Promocionar</h3>
                <p className="text-slate-600">
                  Crea un perfil formal para mostrar productos, redes sociales e imágenes profesionales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Emprendimientos destacados
              </h2>
              <p className="text-slate-600">Los mejores negocios locales de nuestra comunidad</p>
            </div>
            <Link to="/buscar">
              <Button variant="outline">
                Ver todos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {destacados.map((item) => (
              <Link key={item.id} to={`/emprendimiento/${item.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="aspect-video bg-slate-200 overflow-hidden">
                    <img
                      src={item.imagen || item.logo}
                      alt={item.nombre}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                        {item.categoria}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {item.nombre}
                    </h3>
                    <p className="text-slate-600 line-clamp-2">{item.descripcion}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="text-5xl font-bold text-primary-400">500+</div>
              <div className="text-slate-300">Emprendimientos</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-primary-400">10K+</div>
              <div className="text-slate-300">Usuarios activos</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-primary-400">50+</div>
              <div className="text-slate-300">Categorías</div>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-primary-400">98%</div>
              <div className="text-slate-300">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            ¿Listo para crecer tu negocio?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de emprendedores que ya están conectando con más clientes a través de InnovaGO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/crear">
              <Button size="lg">
                <Rocket className="w-5 h-5 mr-2" />
                Comienza gratis
              </Button>
            </Link>
            <Link to="/como-crear">
              <Button size="lg" variant="secondary">
                <ArrowRight className="w-5 h-5 mr-2" />
                Cómo funciona
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
