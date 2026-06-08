import { useState } from 'react'
import { Plus, Pencil, Trash2, Eye, EyeOff, Package } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Select } from '../components/ui/Select'
import { products as initialProducts } from '../data/mockData'
import { formatCurrency } from '../lib/utils'
import type { Product } from '../types'

const availabilityLabels = {
  available: { label: 'Disponible', variant: 'success' as const },
  unavailable: { label: 'Agotado', variant: 'danger' as const },
  draft: { label: 'Borrador', variant: 'warning' as const },
}

export function ProductsPage() {
  const [productList, setProductList] = useState(initialProducts)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<Partial<Product>>({})

  const openCreate = () => {
    setEditingProduct(null)
    setForm({ availability: 'draft', published: false, stock: 0, price: 0 })
    setModalOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    setForm(product)
    setModalOpen(true)
  }

  const handleSave = () => {
    if (editingProduct) {
      setProductList((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...form } as Product : p))
      )
    } else {
      const newProduct: Product = {
        id: String(Date.now()),
        name: form.name || 'Nuevo producto',
        description: form.description || '',
        price: form.price || 0,
        stock: form.stock || 0,
        category: form.category || 'General',
        images: ['https://images.unsplash.com/photo-1565193564953-5ad626259754?w=300&h=300&fit=crop'],
        availability: form.availability || 'draft',
        published: form.published || false,
      }
      setProductList((prev) => [...prev, newProduct])
    }
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id))
  }

  const togglePublish = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Productos y Servicios</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestiona tu catálogo de productos</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Crear producto
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productList.map((product) => {
          const avail = availabilityLabels[product.availability]
          return (
            <Card key={product.id} padding={false} className="overflow-hidden">
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-40 w-full object-cover"
                />
                <div className="absolute right-2 top-2 flex gap-1">
                  <Badge variant={avail.variant}>{avail.label}</Badge>
                  {product.published ? (
                    <Badge variant="info">Publicado</Badge>
                  ) : (
                    <Badge variant="default">Oculto</Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{product.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xs text-slate-500">Stock: {product.stock}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(product)}>
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePublish(product.id)}
                    title={product.published ? 'Despublicar' : 'Publicar'}
                  >
                    {product.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {productList.length === 0 && (
        <Card className="py-12 text-center">
          <Package className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-4 text-slate-500">No hay productos. Crea tu primer producto.</p>
          <Button className="mt-4" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Crear producto
          </Button>
        </Card>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Editar producto' : 'Crear producto'}
        size="lg"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Nombre"
            value={form.name || ''}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Precio"
            type="number"
            value={form.price || ''}
            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
          />
          <Input
            label="Stock"
            type="number"
            value={form.stock ?? ''}
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
          />
          <Input
            label="Categoría"
            value={form.category || ''}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <div className="md:col-span-2">
            <Textarea
              label="Descripción"
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <Select
            label="Estado de disponibilidad"
            value={form.availability || 'draft'}
            onChange={(e) => setForm({ ...form, availability: e.target.value as Product['availability'] })}
            options={[
              { value: 'available', label: 'Disponible' },
              { value: 'unavailable', label: 'Agotado' },
              { value: 'draft', label: 'Borrador' },
            ]}
          />
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published || false}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded border-slate-300 text-primary-600"
              />
              Publicar producto
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </Modal>
    </div>
  )
}
