import { Link } from "react-router-dom";
import { Eye, MessageCircle, Star, MapPin, Heart } from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export default function CardEmprendimiento({ emprendimiento }) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="aspect-video bg-slate-200 overflow-hidden">
        <img
          src={emprendimiento.imagen || emprendimiento.logo}
          alt={emprendimiento.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {emprendimiento.categoria}
          </Badge>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{emprendimiento.calificacion}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
          {emprendimiento.nombre}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{emprendimiento.descripcion}</p>
        
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{emprendimiento.direccion}</span>
        </div>

        <div className="flex gap-2">
          <a
            href={`https://wa.me/${emprendimiento.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1"
          >
            <Button size="sm" variant="secondary" className="w-full">
              <MessageCircle className="w-4 h-4 mr-1" />
              Contactar
            </Button>
          </a>
          <Link to={`/emprendimiento/${emprendimiento.id}`} className="flex-1">
            <Button size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-1" />
              Ver
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}