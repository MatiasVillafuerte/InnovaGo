import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import BuscarPage from "./pages/BuscarPage";
import ResultadosPage from "./pages/ResultadosPage";
import MapaPage from "./pages/MapaPage";
import DetalleEmprendimientoPage from "./pages/DetalleEmprendimientoPage";
import PerfilPage from "./pages/PerfilPage";
import FavoritosPage from "./pages/FavoritosPage";
import ResenasPage from "./pages/ResenasPage";

export default function App() {
  return (
    <div>
      <Header />

      <main className="contenedor">
        <Routes>
          <Route path="/" element={<Navigate to="/buscar" replace />} />
          <Route path="/buscar" element={<BuscarPage />} />
          <Route path="/resultados" element={<ResultadosPage />} />
          <Route path="/mapa" element={<MapaPage />} />
          <Route
            path="/emprendimiento/:id"
            element={<DetalleEmprendimientoPage />}
          />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/favoritos" element={<FavoritosPage />} />
          <Route path="/resenas" element={<ResenasPage />} />
        </Routes>
      </main>
    </div>
  );
}
