export interface Entrepreneur {
  id: string
  name: string
  email: string
  avatar: string
  phone: string
}

export interface Business {
  id: string
  name: string
  description: string
  category: string
  subcategory: string
  yearCreated: number
  status: 'active' | 'inactive'
  contact: ContactInfo
  location: LocationInfo
  media: MediaInfo
}

export interface ContactInfo {
  phone: string
  whatsapp: string
  email: string
  website: string
  facebook: string
  instagram: string
  tiktok: string
  linkedin: string
}

export interface LocationInfo {
  country: string
  department: string
  city: string
  address: string
  lat: number
  lng: number
}

export interface MediaInfo {
  logo: string
  cover: string
  gallery: string[]
  videoUrl: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  images: string[]
  availability: 'available' | 'unavailable' | 'draft'
  published: boolean
}

export interface Promotion {
  id: string
  title: string
  type: 'discount' | 'coupon' | 'featured'
  discount: number
  code?: string
  startDate: string
  endDate: string
  status: 'active' | 'scheduled' | 'expired'
}

export interface Message {
  id: string
  sender: string
  subject: string
  preview: string
  date: string
  status: 'pending' | 'answered' | 'closed'
  unread: boolean
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
  replied: boolean
  reply?: string
}

export interface DashboardStats {
  totalVisits: number
  totalFavorites: number
  productsPublished: number
  messagesReceived: number
  averageRating: number
  weeklyVisits: { day: string; visits: number }[]
}

export interface AccessLog {
  id: string
  device: string
  location: string
  ip: string
  date: string
  current: boolean
}

export interface ConnectedDevice {
  id: string
  name: string
  browser: string
  lastActive: string
  current: boolean
}
