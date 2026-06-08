import { useState } from 'react'
import { MapPin, Upload, Share2, Globe } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Select } from '../components/ui/Select'
import { Button } from '../components/ui/Button'
import { Tabs } from '../components/ui/Tabs'
import { Badge } from '../components/ui/Badge'
import { business, categories, subcategories } from '../data/mockData'

const tabs = [
  { id: 'general', label: 'Información General' },
  { id: 'contact', label: 'Contacto' },
  { id: 'location', label: 'Ubicación' },
  { id: 'media', label: 'Multimedia' },
]

export function BusinessPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [formData, setFormData] = useState(business)
  const [selectedCategory, setSelectedCategory] = useState(formData.category)

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateContact = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }))
  }

  const updateLocation = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [field]: value },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Gestión del Emprendimiento</h1>
          <p className="text-slate-500 dark:text-slate-400">Registra y edita la información de tu negocio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Vista previa</Button>
          <Button>Guardar cambios</Button>
        </div>
      </div>

      <Card padding={false}>
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Nombre del emprendimiento"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
              <Select
                label="Estado"
                value={formData.status}
                onChange={(e) => updateField('status', e.target.value)}
                options={[
                  { value: 'active', label: 'Activo' },
                  { value: 'inactive', label: 'Inactivo' },
                ]}
              />
              <div className="md:col-span-2">
                <Textarea
                  label="Descripción"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={4}
                />
              </div>
              <Select
                label="Categoría"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  updateField('category', e.target.value)
                }}
                options={categories.map((c) => ({ value: c, label: c }))}
              />
              <Select
                label="Subcategoría"
                value={formData.subcategory}
                onChange={(e) => updateField('subcategory', e.target.value)}
                options={(subcategories[selectedCategory] || []).map((s) => ({ value: s, label: s }))}
              />
              <Input
                label="Año de creación"
                type="number"
                value={formData.yearCreated}
                onChange={(e) => updateField('yearCreated', parseInt(e.target.value))}
              />
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Teléfono"
                value={formData.contact.phone}
                onChange={(e) => updateContact('phone', e.target.value)}
              />
              <Input
                label="WhatsApp"
                value={formData.contact.whatsapp}
                onChange={(e) => updateContact('whatsapp', e.target.value)}
              />
              <Input
                label="Correo electrónico"
                type="email"
                value={formData.contact.email}
                onChange={(e) => updateContact('email', e.target.value)}
              />
              <Input
                label="Página web"
                value={formData.contact.website}
                onChange={(e) => updateContact('website', e.target.value)}
              />
              <Card className="md:col-span-2 bg-slate-50 dark:bg-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-base">Redes sociales</CardTitle>
                </CardHeader>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="relative">
                    <Share2 className="absolute left-3 top-9 h-4 w-4 text-slate-400" />
                    <Input
                      label="Facebook"
                      className="pl-10"
                      value={formData.contact.facebook}
                      onChange={(e) => updateContact('facebook', e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Share2 className="absolute left-3 top-9 h-4 w-4 text-slate-400" />
                    <Input
                      label="Instagram"
                      className="pl-10"
                      value={formData.contact.instagram}
                      onChange={(e) => updateContact('instagram', e.target.value)}
                    />
                  </div>
                  <Input
                    label="TikTok"
                    value={formData.contact.tiktok}
                    onChange={(e) => updateContact('tiktok', e.target.value)}
                  />
                  <div className="relative">
                    <Globe className="absolute left-3 top-9 h-4 w-4 text-slate-400" />
                    <Input
                      label="LinkedIn"
                      className="pl-10"
                      value={formData.contact.linkedin}
                      onChange={(e) => updateContact('linkedin', e.target.value)}
                    />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Input
                  label="País"
                  value={formData.location.country}
                  onChange={(e) => updateLocation('country', e.target.value)}
                />
                <Input
                  label="Departamento"
                  value={formData.location.department}
                  onChange={(e) => updateLocation('department', e.target.value)}
                />
                <Input
                  label="Ciudad"
                  value={formData.location.city}
                  onChange={(e) => updateLocation('city', e.target.value)}
                />
                <Input
                  label="Dirección"
                  value={formData.location.address}
                  onChange={(e) => updateLocation('address', e.target.value)}
                />
              </div>
              <Card className="overflow-hidden p-0">
                <div className="flex h-64 items-center justify-center bg-slate-100 dark:bg-slate-800">
                  <div className="text-center">
                    <MapPin className="mx-auto h-10 w-10 text-primary-600" />
                    <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {formData.location.address}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formData.location.city}, {formData.location.department}, {formData.location.country}
                    </p>
                    <Badge variant="info" className="mt-3">
                      Mapa interactivo — {formData.location.lat}, {formData.location.lng}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Logo del emprendimiento
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={formData.media.logo}
                      alt="Logo"
                      className="h-24 w-24 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                      Subir logo
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Imagen de portada
                  </label>
                  <div className="relative">
                    <img
                      src={formData.media.cover}
                      alt="Portada"
                      className="h-24 w-full rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                    />
                    <Button variant="outline" size="sm" className="absolute bottom-2 right-2">
                      <Upload className="h-4 w-4" />
                      Cambiar
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Galería de imágenes
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {formData.media.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Galería ${i + 1}`}
                      className="aspect-square rounded-lg border border-slate-200 object-cover dark:border-slate-700"
                    />
                  ))}
                  <button className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-slate-400 hover:border-primary-500 hover:text-primary-500 dark:border-slate-600">
                    <Upload className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <Input
                label="Video promocional (URL)"
                value={formData.media.videoUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    media: { ...prev.media, videoUrl: e.target.value },
                  }))
                }
                placeholder="https://youtube.com/..."
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
