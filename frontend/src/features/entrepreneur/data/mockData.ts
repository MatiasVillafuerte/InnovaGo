import type {
  AccessLog,
  Business,
  ConnectedDevice,
  DashboardStats,
  Entrepreneur,
  Message,
  Product,
  Promotion,
  Review,
} from '../types'

export const entrepreneur: Entrepreneur = {
  id: '1',
  name: 'María González',
  email: 'maria.gonzalez@email.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  phone: '+57 300 123 4567',
}

export const dashboardStats: DashboardStats = {
  totalVisits: 12458,
  totalFavorites: 892,
  productsPublished: 24,
  messagesReceived: 156,
  averageRating: 4.7,
  weeklyVisits: [
    { day: 'Lun', visits: 420 },
    { day: 'Mar', visits: 580 },
    { day: 'Mié', visits: 510 },
    { day: 'Jue', visits: 690 },
    { day: 'Vie', visits: 820 },
    { day: 'Sáb', visits: 950 },
    { day: 'Dom', visits: 710 },
  ],
}

export const business: Business = {
  id: '1',
  name: 'EcoArtesanías Colombia',
  description:
    'Emprendimiento dedicado a la creación de productos artesanales sostenibles, hechos a mano con materiales reciclados y de origen local. Cada pieza cuenta una historia de tradición y respeto por el medio ambiente.',
  category: 'Artesanías',
  subcategory: 'Productos ecológicos',
  yearCreated: 2019,
  status: 'active',
  contact: {
    phone: '+57 300 123 4567',
    whatsapp: '+57 300 123 4567',
    email: 'contacto@ecoartesanias.co',
    website: 'https://ecoartesanias.co',
    facebook: 'ecoartesaniascol',
    instagram: '@ecoartesaniascol',
    tiktok: '@ecoartesanias',
    linkedin: 'ecoartesanias-colombia',
  },
  location: {
    country: 'Colombia',
    department: 'Antioquia',
    city: 'Medellín',
    address: 'Calle 10 #43-28, El Poblado',
    lat: 6.2088,
    lng: -75.5674,
  },
  media: {
    logo: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200&h=200&fit=crop',
    cover: 'https://images.unsplash.com/photo-1452860606245-08befc0ff4b9?w=1200&h=400&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565193564953-5ad626259754?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1578749556568-2c6a0f1651b0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Bolso tejido reciclado',
    description: 'Bolso artesanal tejido con fibras recicladas de botellas PET.',
    price: 89000,
    stock: 15,
    category: 'Accesorios',
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?w=300&h=300&fit=crop'],
    availability: 'available',
    published: true,
  },
  {
    id: '2',
    name: 'Maceta de cerámica',
    description: 'Maceta hecha a mano con arcilla local y esmaltes naturales.',
    price: 45000,
    stock: 32,
    category: 'Decoración',
    images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop'],
    availability: 'available',
    published: true,
  },
  {
    id: '3',
    name: 'Collar de semillas',
    description: 'Collar artesanal elaborado con semillas nativas de la región.',
    price: 35000,
    stock: 0,
    category: 'Joyería',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop'],
    availability: 'unavailable',
    published: true,
  },
  {
    id: '4',
    name: 'Set de velas aromáticas',
    description: 'Pack de 3 velas con cera de soya y aceites esenciales naturales.',
    price: 62000,
    stock: 8,
    category: 'Aromaterapia',
    images: ['https://images.unsplash.com/photo-1602608675228-8d8a5c4c8f0e?w=300&h=300&fit=crop'],
    availability: 'draft',
    published: false,
  },
]

export const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Descuento de verano',
    type: 'discount',
    discount: 20,
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    status: 'active',
  },
  {
    id: '2',
    title: 'Cupón bienvenida',
    type: 'coupon',
    discount: 15,
    code: 'BIENVENIDO15',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'active',
  },
  {
    id: '3',
    title: 'Producto destacado del mes',
    type: 'featured',
    discount: 0,
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    status: 'active',
  },
  {
    id: '4',
    title: 'Black Friday artesanal',
    type: 'discount',
    discount: 30,
    startDate: '2026-11-25',
    endDate: '2026-11-30',
    status: 'scheduled',
  },
]

export const messages: Message[] = [
  {
    id: '1',
    sender: 'Carlos Méndez',
    subject: 'Consulta sobre envíos internacionales',
    preview: 'Hola, me interesa saber si realizan envíos a México y cuánto tardaría...',
    date: '2026-06-07T10:30:00',
    status: 'pending',
    unread: true,
  },
  {
    id: '2',
    sender: 'Ana Rodríguez',
    subject: 'Pedido personalizado de macetas',
    preview: 'Quisiera encargar 10 macetas con diseño personalizado para un evento...',
    date: '2026-06-06T15:45:00',
    status: 'answered',
    unread: false,
  },
  {
    id: '3',
    sender: 'Luis Torres',
    subject: 'Disponibilidad de stock',
    preview: 'Buenos días, ¿tienen disponible el collar de semillas en color natural?',
    date: '2026-06-05T09:20:00',
    status: 'closed',
    unread: false,
  },
  {
    id: '4',
    sender: 'Patricia Silva',
    subject: 'Colaboración con tienda local',
    preview: 'Represento una tienda de productos sostenibles y me gustaría proponer...',
    date: '2026-06-04T14:00:00',
    status: 'pending',
    unread: true,
  },
]

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Sofía Herrera',
    rating: 5,
    comment: 'Productos de excelente calidad. El bolso tejido superó mis expectativas, muy bien acabado.',
    date: '2026-06-01',
    replied: true,
    reply: '¡Muchas gracias Sofía! Nos alegra que hayas disfrutado tu compra.',
  },
  {
    id: '2',
    author: 'Diego Ramírez',
    rating: 4,
    comment: 'Buenos productos y atención rápida. El envío tardó un poco más de lo esperado.',
    date: '2026-05-28',
    replied: false,
  },
  {
    id: '3',
    author: 'Laura Martínez',
    rating: 5,
    comment: 'Me encanta el compromiso con el medio ambiente. Las macetas son hermosas.',
    date: '2026-05-20',
    replied: true,
    reply: 'Gracias Laura, cada pieza está hecha con mucho cariño y conciencia ambiental.',
  },
  {
    id: '4',
    author: 'Usuario anónimo',
    rating: 1,
    comment: 'Contenido inapropiado de prueba para reportar.',
    date: '2026-05-15',
    replied: false,
  },
]

export const dailyVisits = [
  { date: '1 Jun', visits: 380 },
  { date: '2 Jun', visits: 420 },
  { date: '3 Jun', visits: 510 },
  { date: '4 Jun', visits: 490 },
  { date: '5 Jun', visits: 620 },
  { date: '6 Jun', visits: 580 },
  { date: '7 Jun', visits: 710 },
]

export const topViewedProducts = [
  { name: 'Bolso tejido reciclado', views: 2340 },
  { name: 'Maceta de cerámica', views: 1890 },
  { name: 'Collar de semillas', views: 1560 },
  { name: 'Set de velas aromáticas', views: 980 },
]

export const topSavedProducts = [
  { name: 'Bolso tejido reciclado', saves: 456 },
  { name: 'Maceta de cerámica', saves: 312 },
  { name: 'Collar de semillas', saves: 278 },
  { name: 'Set de velas aromáticas', saves: 145 },
]

export const monthlyGrowth = [
  { month: 'Ene', growth: 12 },
  { month: 'Feb', growth: 18 },
  { month: 'Mar', growth: 15 },
  { month: 'Abr', growth: 22 },
  { month: 'May', growth: 28 },
  { month: 'Jun', growth: 35 },
]

export const accessLogs: AccessLog[] = [
  { id: '1', device: 'Windows PC', location: 'Medellín, CO', ip: '190.**.***.45', date: '2026-06-08 09:15', current: true },
  { id: '2', device: 'iPhone 15', location: 'Medellín, CO', ip: '190.**.***.78', date: '2026-06-07 20:30', current: false },
  { id: '3', device: 'MacBook Pro', location: 'Bogotá, CO', ip: '181.**.***.12', date: '2026-06-05 14:22', current: false },
]

export const connectedDevices: ConnectedDevice[] = [
  { id: '1', name: 'Windows PC - Chrome', browser: 'Chrome 137', lastActive: 'Ahora', current: true },
  { id: '2', name: 'iPhone 15 - Safari', browser: 'Safari 18', lastActive: 'Hace 2 horas', current: false },
  { id: '3', name: 'MacBook Pro - Firefox', browser: 'Firefox 139', lastActive: 'Hace 3 días', current: false },
]

export const categories = [
  'Artesanías',
  'Alimentos',
  'Tecnología',
  'Moda',
  'Belleza',
  'Servicios',
  'Educación',
  'Salud',
]

export const subcategories: Record<string, string[]> = {
  Artesanías: ['Productos ecológicos', 'Cerámica', 'Textiles', 'Joyería'],
  Alimentos: ['Gourmet', 'Orgánicos', 'Bebidas', 'Postres'],
  Tecnología: ['Software', 'Hardware', 'Apps', 'Consultoría IT'],
  Moda: ['Ropa', 'Accesorios', 'Calzado', 'Sostenible'],
  Belleza: ['Cosmética natural', 'Cuidado personal', 'Spa'],
  Servicios: ['Consultoría', 'Diseño', 'Marketing', 'Legal'],
  Educación: ['Cursos online', 'Tutorías', 'Talleres'],
  Salud: ['Bienestar', 'Nutrición', 'Fitness'],
}
