import "leaflet/dist/leaflet.css";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  FaCrosshairs,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
} from "react-icons/fa";
import { categorias, emprendimientos } from "../data/emprendimientos";
import LogoEmprendimiento from "../components/LogoEmprendimiento";

function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function CambiarVista({ centro }) {
  const map = useMap();
  map.setView(centro, 14);
  return null;
}

function crearIconoEmprendimiento(logo) {
  return L.divIcon({
    className: "marker-logo",
    html: `<div class="marker-logo-inner"><img src="${logo}" /></div>`,
    iconSize: [52, 52],
    iconAnchor: [26, 52],
    popupAnchor: [0, -48],
  });
}

const iconoUsuario = L.divIcon({
  className: "marker-usuario",
  html: `<div class="marker-usuario-inner">📍</div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
});

export default function MapaPage() {
  const centroCochabamba = [-17.3895, -66.1568];

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
  const [ordenarCercanos, setOrdenarCercanos] = useState(false);

  function obtenerUbicacion() {
    if (!navigator.geolocation) {
      alert("Tu navegador no permite obtener ubicación.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const ubicacion = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setUbicacionUsuario(ubicacion);
        setOrdenarCercanos(true);
      },
      () => {
        alert("No se pudo obtener tu ubicación. Revisa los permisos del navegador.");
      }
    );
  }

  const emprendimientosFiltrados = useMemo(() => {
    let resultado = emprendimientos.filter((item) => {
      const coincideTexto =
        busqueda.trim() === "" ||
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.categoria.toLowerCase().includes(busqueda.toLowerCase());

      const coincideCategoria =
        categoria === "Todos" || item.categoria === categoria;

      return coincideTexto && coincideCategoria;
    });

    resultado = resultado.map((item) => {
      const distancia = ubicacionUsuario
        ? calcularDistanciaKm(
            ubicacionUsuario.lat,
            ubicacionUsuario.lng,
            item.lat,
            item.lng
          )
        : null;

      return {
        ...item,
        distancia,
      };
    });

    if (ordenarCercanos && ubicacionUsuario) {
      resultado.sort((a, b) => a.distancia - b.distancia);
    }

    return resultado;
  }, [busqueda, categoria, ubicacionUsuario, ordenarCercanos]);

  const centroMapa = ubicacionUsuario
    ? [ubicacionUsuario.lat, ubicacionUsuario.lng]
    : centroCochabamba;

  return (
    <section>
      <div className="titulo-pagina">
        <span className="etiqueta">OpenStreetMap</span>
        <h1>Mapa de emprendimientos</h1>
        <p>
          Busca emprendimientos, filtra por categoría y usa tu ubicación para
          ver cuáles están más cerca de ti.
        </p>
      </div>

      <div className="mapa-controles">
        <div className="mapa-buscador">
          <FaSearch />
          <input
            type="text"
            placeholder="Buscar emprendimiento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {categorias.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <button onClick={obtenerUbicacion}>
          <FaCrosshairs />
          Usar mi ubicación
        </button>

        <button
          className={ordenarCercanos ? "activo" : ""}
          onClick={() => setOrdenarCercanos(!ordenarCercanos)}
        >
          <FaMapMarkerAlt />
          Más cercanos
        </button>
      </div>

      <div className="mapa-osm-layout">
        <div className="mapa-osm">
          <MapContainer
            center={centroMapa}
            zoom={13}
            scrollWheelZoom={true}
            className="mapa-real"
          >
            <CambiarVista centro={centroMapa} />

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {ubicacionUsuario && (
              <Marker
                position={[ubicacionUsuario.lat, ubicacionUsuario.lng]}
                icon={iconoUsuario}
              >
                <Popup>Tu ubicación actual</Popup>
              </Marker>
            )}

            {emprendimientosFiltrados.map((item) => (
              <Marker
                key={item.id}
                position={[item.lat, item.lng]}
                icon={crearIconoEmprendimiento(item.logo)}
              >
                <Popup>
                  <div className="popup-mapa">
                    <div className="popup-head">
                      <LogoEmprendimiento emprendimiento={item} size="sm" />

                      <div>
                        <strong>{item.nombre}</strong>
                        <span>{item.categoria}</span>
                      </div>
                    </div>

                    <p>{item.descripcion}</p>

                    {item.distancia !== null && (
                      <small className="distancia-popup">
                        A {item.distancia.toFixed(2)} km de ti
                      </small>
                    )}

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
          <h3>Emprendimientos encontrados</h3>

          {emprendimientosFiltrados.map((item) => (
            <Link
              key={item.id}
              className="item-lista-mapa"
              to={`/emprendimiento/${item.id}`}
            >
              <LogoEmprendimiento emprendimiento={item} size="sm" />

              <div>
                <strong>{item.nombre}</strong>
                <p>{item.categoria}</p>

                <small>
                  <FaStar /> {item.calificacion}
                  {item.distancia !== null &&
                    ` · ${item.distancia.toFixed(2)} km`}
                </small>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </section>
  );
}