import { useState } from 'react'
import { Plus, Percent, Ticket, Star, Calendar } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { promotions as initialPromotions } from '../data/mockData'
import { formatDate } from '../lib/utils'
import type { Promotion } from '../types'

const typeConfig = {
  discount: { label: 'Descuento', icon: Percent, variant: 'info' as const },
  coupon: { label: 'Cupón', icon: Ticket, variant: 'success' as const },
  featured: { label: 'Destacada', icon: Star, variant: 'warning' as const },
}

const statusConfig = {
  active: { label: 'Activa', variant: 'success' as const },
  scheduled: { label: 'Programada', variant: 'info' as const },
  expired: { label: 'Expirada', variant: 'default' as const },
}

export function PromotionsPage() {
  const [promoList, setPromoList] = useState(initialPromotions)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<Partial<Promotion>>({})

  const handleCreate = () => {
    const newPromo: Promotion = {
      id: String(Date.now()),
      title: form.title || 'Nueva promoción',
      type: form.type || 'discount',
      discount: form.discount || 0,
      code: form.code,
      startDate: form.startDate || new Date().toISOString().split('T')[0],
      endDate: form.endDate || new Date().toISOString().split('T')[0],
      status: 'scheduled',
    }
    setPromoList((prev) => [...prev, newPromo])
    setModalOpen(false)
    setForm({})
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Promociones</h1>
          <p className="text-slate-500 dark:text-slate-400">Crea descuentos, cupones y ofertas destacadas</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Crear promoción
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {promoList.map((promo) => {
          const type = typeConfig[promo.type]
          const status = statusConfig[promo.status]
          const TypeIcon = type.icon
          return (
            <Card key={promo.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary-50 p-2.5 dark:bg-primary-900/30">
                    <TypeIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{promo.title}</h3>
                    <Badge variant={type.variant} className="mt-1">
                      {type.label}
                    </Badge>
                  </div>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>

              {promo.discount > 0 && (
                <p className="mt-4 text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {promo.discount}% OFF
                </p>
              )}

              {promo.code && (
                <div className="mt-3 rounded-lg border border-dashed border-primary-300 bg-primary-50 px-4 py-2 text-center dark:border-primary-700 dark:bg-primary-900/20">
                  <span className="font-mono text-sm font-bold text-primary-700 dark:text-primary-300">
                    {promo.code}
                  </span>
                </div>
              )}

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(promo.startDate)} — {formatDate(promo.endDate)}
              </div>
            </Card>
          )
        })}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Crear promoción" size="md">
        <div className="space-y-4">
          <Input
            label="Título"
            value={form.title || ''}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Select
            label="Tipo de promoción"
            value={form.type || 'discount'}
            onChange={(e) => setForm({ ...form, type: e.target.value as Promotion['type'] })}
            options={[
              { value: 'discount', label: 'Descuento temporal' },
              { value: 'coupon', label: 'Cupón' },
              { value: 'featured', label: 'Oferta destacada' },
            ]}
          />
          {form.type !== 'featured' && (
            <Input
              label="Porcentaje de descuento"
              type="number"
              value={form.discount ?? ''}
              onChange={(e) => setForm({ ...form, discount: parseInt(e.target.value) })}
            />
          )}
          {form.type === 'coupon' && (
            <Input
              label="Código del cupón"
              value={form.code || ''}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
            />
          )}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Fecha inicio"
              type="date"
              value={form.startDate || ''}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
            <Input
              label="Fecha fin"
              type="date"
              value={form.endDate || ''}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreate}>Crear promoción</Button>
        </div>
      </Modal>
    </div>
  )
}
