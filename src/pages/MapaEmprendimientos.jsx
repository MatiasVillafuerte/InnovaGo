import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { getFullEmprendimientos } from "../services/database";

const icono = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function MapaEmprendimientos() {
  const emprendimientos = getFullEmprendimientos().filter(e => e.ubicacion);

  return (
    <section className="section">
      <span className="tag">Mapa real</span>
      <h1>Mapa de emprendimientos</h1>
      <p className="lead">Ubica emprendimientos registrados en un mapa interactivo.</p>

      <div className="map-box">
        <MapContainer center={[-16.5, -68.1193]} zoom={13} className="map">
          <TileLayer attribution="OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {emprendimientos.map(e => (
            <Marker key={e.id} position={[e.ubicacion.lat, e.ubicacion.lng]} icon={icono}>
              <Popup>
                <b>{e.nombre}</b><br />
                {e.categoria?.nombre}<br />
                {e.ubicacion.direccion}<br />
                <Link to={`/emprendimiento/${e.id}`}>Ver perfil</Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
