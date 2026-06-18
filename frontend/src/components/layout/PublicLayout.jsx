import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <span className="text-xl font-bold">InnovaGO</span>
              </div>
              <p className="text-slate-400 text-sm">
                Plataforma de emprendimientos locales
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="/buscar" className="hover:text-white transition-colors">Buscar</a></li>
                <li><a href="/mapa" className="hover:text-white transition-colors">Mapa</a></li>
                <li><a href="/favoritos" className="hover:text-white transition-colors">Favoritos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/como-crear" className="hover:text-white transition-colors">Cómo crear</a></li>
                <li><a href="/acerca" className="hover:text-white transition-colors">Acerca de</a></li>
                <li><a href="/crear" className="hover:text-white transition-colors">Publica tu negocio</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>info@innovago.com</li>
                <li>+591 123 456 789</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 InnovaGO. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
