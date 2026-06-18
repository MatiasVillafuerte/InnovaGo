import { Routes, Route } from 'react-router-dom'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { DashboardPage } from './pages/DashboardPage'
import { BusinessPage } from './pages/BusinessPage'
import { ProductsPage } from './pages/ProductsPage'
import { PromotionsPage } from './pages/PromotionsPage'
import { MessagesPage } from './pages/MessagesPage'
import { StatisticsPage } from './pages/StatisticsPage'
import { ReviewsPage } from './pages/ReviewsPage'
import { SettingsPage } from './pages/SettingsPage'
import ErrorBoundary from '../../components/ErrorBoundary'

export default function EntrepreneurRoutes() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="emprendimiento" element={<BusinessPage />} />
          <Route path="productos" element={<ProductsPage />} />
          <Route path="promociones" element={<PromotionsPage />} />
          <Route path="mensajes" element={<MessagesPage />} />
          <Route path="estadisticas" element={<StatisticsPage />} />
          <Route path="resenas" element={<ReviewsPage />} />
          <Route path="configuracion" element={<SettingsPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
