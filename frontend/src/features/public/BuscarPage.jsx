import { useState } from 'react'
import { Search, Filter, MapPin } from 'lucide-react'
import { useEmprendimientos } from '../../hooks/useEmprendimientos'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardContent } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import CardEmprendimiento from '../../components/CardEmprendimiento'

export default function BuscarPage() {
  const { emprendimientos, categorias } = useEmprendimientos()
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('Todos')

  const filtrados = emprendimientos.filter((item) => {
    const coincideTexto =
      texto.trim() === '' ||
      item.nombre.toLowerCase().includes(texto.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(texto.toLowerCase()) ||
      item.categoria.toLowerCase().includes(texto.toLowerCase())

    const coincideCategoria =
      categoria === 'Todos' || item.categoria === categoria

    return coincideTexto && coincideCategoria
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Catálogo de emprendimientos
        </h1>
        <p className="text-slate-600">
          Encuentra negocios locales, revisa sus productos, mira su ubicación y contacta directamente
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar emprendimiento, categoría o producto..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="secondary" className="md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant={categoria === 'Todos' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setCategoria('Todos')}
            >
              Todos
            </Button>
            {categorias.map((cat) => (
              <Button
                key={cat}
                variant={categoria === cat ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCategoria(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-600">
          <span className="font-semibold text-slate-900">{filtrados.length}</span> emprendimiento(s) encontrados
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            Ver en mapa
          </Button>
        </div>
      </div>

      {/* Grid */}
      {filtrados.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((item) => (
            <CardEmprendimiento key={item.id} emprendimiento={item} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No se encontraron resultados
            </h3>
            <p className="text-slate-600">
              Intenta con otros términos de búsqueda o selecciona otra categoría
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}