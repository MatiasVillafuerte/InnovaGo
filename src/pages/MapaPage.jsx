import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { FaExternalLinkAlt } from "react-icons/fa";
import { emprendimientos } from "../data/emprendimientos";
import LogoEmprendimiento from "../components/LogoEmprendimiento";

const iconoMapa = L.divIcon({
  className: "marcador-osm",
  html: "📍",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

export default function MapaPage() {
  const centroCochabamba = [-17.3895, -66.1568];

  return (
    <section>
      <div className="titulo-pagina">
        <span className="etiqueta">OpenStreetMap</span>
        <h1>Mapa de emprendimientos</h1>
        <p>
          Visualiza los emprendimientos registrados en el mapa y abre el detalle
          de cada negocio.
        </p>
      </div>

      <div className="mapa-osm-layout">
        <div className="mapa-osm">
          <MapContainer
            center={centroCochabamba}
            zoom={13}
            scrollWheelZoom={true}
            className="mapa-real"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {emprendimientos.map((item) => (
              <Marker
                key={item.id}
                position={[item.lat, item.lng]}
                icon={iconoMapa}
              >
                <Popup>
                  <div className="popup-mapa">
                    <div className="popup-head">
                      <LogoEmprendimiento
                        categoria={item.categoria}
                        size="sm"
                      />

                      <div>
                        <strong>{item.nombre}</strong>
                        <span>{item.categoria}</span>
                      </div>
                    </div>

                    <p>{item.descripcion}</p>

                    <Link to={`/emprendimiento/${item.id}`} className="popup-link">
                      Ver detalle <FaExternalLinkAlt />
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <aside className="lista-mapa">
          <h3>Emprendimientos</h3>

          {emprendimientos.map((item) => (
            <Link
              key={item.id}
              className="item-lista-mapa"
              to={`/emprendimiento/${item.id}`}
            >
              <LogoEmprendimiento categoria={item.categoria} size="sm" />

              <div>
                <strong>{item.nombre}</strong>
                <p>{item.categoria}</p>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </section>
  );
}