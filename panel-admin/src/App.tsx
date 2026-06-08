import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { Emprendedores } from './pages/Emprendedores'
import { SolicitudesPendientes } from './pages/SolicitudesPendientes'
import { Usuarios } from './pages/Usuarios'
import { Categorias } from './pages/Categorias'
import { Reportes } from './pages/Reportes'
import { Estadisticas } from './pages/Estadisticas'
import { Configuracion } from './pages/Configuracion'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="emprendedores" element={<Emprendedores />} />
          <Route path="solicitudes" element={<SolicitudesPendientes />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="estadisticas" element={<Estadisticas />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
