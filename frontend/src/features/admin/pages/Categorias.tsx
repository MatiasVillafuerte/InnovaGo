import { useState } from 'react'
import { Plus, Pencil, Trash2, Power, PowerOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '../../../components/ui/Modal'
import { categorias as categoriasIniciales } from '../data/mockData'
import type { Categoria } from '../types'

export function Categorias() {
  const [lista, setLista] = useState<Categoria[]>(categoriasIniciales)
  const [showModal, setShowModal] = useState(false)
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: '', descripcion: '' })

  const toggleActiva = (id: string) => {
    setLista((prev) =>
      prev.map((c) => (c.id === id ? { ...c, activa: !c.activa } : c))
    )
  }

  const handleCrear = () => {
    if (!nuevaCategoria.nombre.trim()) return
    setLista((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        nombre: nuevaCategoria.nombre,
        descripcion: nuevaCategoria.descripcion,
        activa: true,
        emprendimientos: 0,
      },
    ])
    setNuevaCategoria({ nombre: '', descripcion: '' })
    setShowModal(false)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Categorías</h1>
          <p className="text-slate-600">Organiza y administra las categorías de emprendimientos</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4" />
          Crear Categoría
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {lista.map((c) => (
          <div
            key={c.id}
            className={`rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
              c.activa ? 'border-slate-200' : 'border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{c.nombre}</h3>
                <p className="mt-1 text-sm text-slate-500">{c.descripcion}</p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  c.activa
                    ? 'bg-success-50 text-success-700'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {c.activa ? 'Activa' : 'Inactiva'}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-400">
              <span className="font-semibold text-slate-700">{c.emprendimientos}</span> emprendimientos
            </p>

            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
              <button title="Editar" className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-600">
                <Pencil className="h-4 w-4" />
              </button>
              <button
                title={c.activa ? 'Desactivar' : 'Activar'}
                onClick={() => toggleActiva(c.id)}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-warning-50 hover:text-warning-600"
              >
                {c.activa ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
              </button>
              <button title="Eliminar" className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-danger-50 hover:text-danger-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Nueva Categoría</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
                <input
                  type="text"
                  value={nuevaCategoria.nombre}
                  onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
                  placeholder="Ej: Gastronomía"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Descripción</label>
                <textarea
                  value={nuevaCategoria.descripcion}
                  onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
                  placeholder="Descripción de la categoría..."
                  rows={3}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleCrear}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
