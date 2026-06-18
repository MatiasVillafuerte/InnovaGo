import { useState } from 'react'
import { MapPin, Upload, Share2, Globe, ExternalLink, Save, Eye, Video } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Textarea } from '../../../components/ui/Input'
import { Select } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'
import { business, categories, subcategories } from '../data/mockData'
import { Tabs } from '../../../components/ui/Tabs'

const tabs = [
  { id: 'general', label: 'Información General' },
  { id: 'contact', label: 'Contacto' },
  { id: 'location', label: 'Ubicación' },
  { id: 'media', label: 'Multimedia' },
]

/* ────────────────────────────────────────────────────────────
   Subcomponentes de sección para mantener código limpio
──────────────────────────────────────────────────────────── */

/** Fila de campo de red social con icono */
function SocialField({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder = '',
}: {
  label: string
  icon: React.ElementType
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   Componente Principal
──────────────────────────────────────────────────────────── */

export function BusinessPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [formData, setFormData] = useState(business)
  const [selectedCategory, setSelectedCategory] = useState(formData.category)
  const [saved, setSaved] = useState(false)

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

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6">
      {/* ── Encabezado ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Gestión del Emprendimiento
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Registra y edita la información de tu negocio
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
            Vista previa
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4" />
            {saved ? '¡Guardado!' : 'Guardar cambios'}
          </Button>
        </div>
      </div>

      {/* ── Card principal con pestañas ── */}
      <Card padding={false}>
        {/* Pestañas */}
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        {/* Contenido de pestañas */}
        <div className="p-6">

          {/* ── TAB: Información General ── */}
          {activeTab === 'general' && (
            <div className="grid gap-6 md:grid-cols-2">
              <Input
                label="Nombre del emprendimiento"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Ej: EcoArtesanías Colombia"
              />

              <Select
                label="Estado"
                value={formData.status}
                onChange={(e) => updateField('status', e.target.value)}
                options={[
                  { value: 'active', label: '✅ Activo' },
                  { value: 'inactive', label: '⏸ Inactivo' },
                ]}
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Descripción"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={4}
                  placeholder="Describe tu emprendimiento, qué lo hace único y qué ofreces..."
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
                options={(subcategories[selectedCategory] || []).map((s) => ({
                  value: s,
                  label: s,
                }))}
              />

              <Input
                label="Año de creación"
                type="number"
                value={formData.yearCreated}
                onChange={(e) => updateField('yearCreated', parseInt(e.target.value))}
                placeholder="2019"
              />

              {/* Estado visual del emprendimiento */}
              <div className="md:col-span-2 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <div
                  className={`h-3 w-3 rounded-full ${
                    formData.status === 'active'
                      ? 'bg-success-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'
                      : 'bg-slate-400'
                  }`}
                />
                <span className="text-sm text-slate-600">
                  Tu emprendimiento está actualmente{' '}
                  <strong>
                    {formData.status === 'active' ? 'publicado y visible' : 'inactivo y oculto'}
                  </strong>{' '}
                  para los usuarios.
                </span>
              </div>
            </div>
          )}

          {/* ── TAB: Contacto ── */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              {/* Datos de contacto directos */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Contacto directo
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Teléfono"
                    value={formData.contact.phone}
                    onChange={(e) => updateContact('phone', e.target.value)}
                    placeholder="+57 300 000 0000"
                    type="tel"
                  />
                  <Input
                    label="WhatsApp"
                    value={formData.contact.whatsapp}
                    onChange={(e) => updateContact('whatsapp', e.target.value)}
                    placeholder="+57 300 000 0000"
                    type="tel"
                  />
                  <Input
                    label="Correo electrónico"
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => updateContact('email', e.target.value)}
                    placeholder="contacto@tuempresa.com"
                  />
                  <Input
                    label="Página web"
                    value={formData.contact.website}
                    onChange={(e) => updateContact('website', e.target.value)}
                    placeholder="https://tuempresa.com"
                    type="url"
                  />
                </div>
              </div>

              {/* Redes sociales */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Share2 className="h-4 w-4 text-primary-600" />
                  Redes sociales
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <SocialField
                    label="Facebook"
                    icon={Globe}
                    value={formData.contact.facebook}
                    onChange={(v) => updateContact('facebook', v)}
                    placeholder="nombre_de_pagina"
                  />
                  <SocialField
                    label="Instagram"
                    icon={Share2}
                    value={formData.contact.instagram}
                    onChange={(v) => updateContact('instagram', v)}
                    placeholder="@usuario"
                  />
                  <SocialField
                    label="TikTok"
                    icon={Globe}
                    value={formData.contact.tiktok}
                    onChange={(v) => updateContact('tiktok', v)}
                    placeholder="@usuario"
                  />
                  <SocialField
                    label="LinkedIn"
                    icon={ExternalLink}
                    value={formData.contact.linkedin}
                    onChange={(v) => updateContact('linkedin', v)}
                    placeholder="nombre-de-empresa"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: Ubicación ── */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="País"
                  value={formData.location.country}
                  onChange={(e) => updateLocation('country', e.target.value)}
                  placeholder="Colombia"
                />
                <Input
                  label="Departamento"
                  value={formData.location.department}
                  onChange={(e) => updateLocation('department', e.target.value)}
                  placeholder="Antioquia"
                />
                <Input
                  label="Ciudad"
                  value={formData.location.city}
                  onChange={(e) => updateLocation('city', e.target.value)}
                  placeholder="Medellín"
                />
                <Input
                  label="Dirección"
                  value={formData.location.address}
                  onChange={(e) => updateLocation('address', e.target.value)}
                  placeholder="Calle 10 #43-28, El Poblado"
                />
              </div>

              {/* Mapa de vista previa */}
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="flex h-56 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="text-center px-4">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
                      <MapPin className="h-7 w-7 text-primary-600" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      {formData.location.address}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {formData.location.city}, {formData.location.department},{' '}
                      {formData.location.country}
                    </p>
                    <Badge variant="info" className="mt-3">
                      {formData.location.lat}, {formData.location.lng}
                    </Badge>
                  </div>
                </div>
                <div className="border-t border-slate-200 bg-slate-50 px-4 py-2.5">
                  <p className="text-xs text-slate-500">
                    💡 El mapa interactivo se mostrará en la vista pública de tu emprendimiento
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB: Multimedia ── */}
          {activeTab === 'media' && (
            <div className="space-y-8">

              {/* Logo + Portada */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Logo */}
                <div>
                  <p className="mb-3 text-sm font-medium text-slate-700">
                    Logo del emprendimiento
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                       src={formData.media.logo}
                       alt="Logo"
                       className="h-24 w-24 shrink-0 rounded-xl border border-slate-200 object-cover"
                    />
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
                        Subir logo
                      </Button>
                      <p className="text-xs text-slate-400">
                        PNG, JPG · Máx. 2 MB · 1:1
                      </p>
                    </div>
                  </div>
                </div>

                {/* Portada */}
                <div>
                  <p className="mb-3 text-sm font-medium text-slate-700">
                    Imagen de portada
                  </p>
                  <div className="relative overflow-hidden rounded-xl border border-slate-200">
                    <img
                      src={formData.media.cover}
                      alt="Portada"
                      className="h-24 w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/40 to-transparent p-2">
                      <Button variant="secondary" size="sm">
                        <Upload className="h-3.5 w-3.5" />
                        Cambiar
                      </Button>
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400">
                    PNG, JPG · Máx. 5 MB · 16:9
                  </p>
                </div>
              </div>

              {/* Galería */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-700">
                    Galería de imágenes
                  </p>
                  <span className="text-xs text-slate-400">
                    {formData.media.gallery.length}/8 fotos
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                  {formData.media.gallery.map((img, i) => (
                    <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200">
                      <img
                        src={img}
                        alt={`Galería ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                        <span className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          Eliminar
                        </span>
                      </div>
                    </div>
                  ))}
                  {/* Botón agregar */}
                  <button
                    type="button"
                    className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 transition-colors hover:border-primary-500 hover:text-primary-500"
                  >
                    <Upload className="h-5 w-5" />
                    <span className="text-[10px] font-medium">Agregar</span>
                  </button>
                </div>
              </div>

              {/* Video */}
              <div>
                <Input
                  label="Video promocional (URL de YouTube o Vimeo)"
                  value={formData.media.videoUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      media: { ...prev.media, videoUrl: e.target.value },
                    }))
                  }
                  placeholder="https://youtube.com/watch?v=..."
                  type="url"
                />
                {formData.media.videoUrl && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary-50 px-4 py-2.5">
                    <Video className="h-4 w-4 text-primary-600" />
                    <a
                      href={formData.media.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate text-sm font-medium text-primary-600 hover:underline"
                    >
                      {formData.media.videoUrl}
                    </a>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
