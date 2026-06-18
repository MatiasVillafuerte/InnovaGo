import { Heart } from 'lucide-react'
import { useEmprendimientos } from '../../hooks/useEmprendimientos'
import CardEmprendimiento from '../../components/CardEmprendimiento'
import { Card, CardContent } from '../../components/ui/Card'

export default function FavoritosPage() {
  const { emprendimientos } = useEmprendimientos()
  const favoritos = emprendimientos.slice(0, 2)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
          <Heart className="w-4 h-4" />
          Usuario
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Mis favoritos
        </h1>
        <p className="text-slate-600">
          Emprendimientos guardados por el usuario
        </p>
      </div>

      {/* Grid */}
      {favoritos.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritos.map((item) => (
            <CardEmprendimiento key={item.id} emprendimiento={item} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No tienes favoritos
            </h3>
            <p className="text-slate-600">
              Guarda emprendimientos para verlos aquí
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}