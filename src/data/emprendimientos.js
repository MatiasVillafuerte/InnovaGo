export const emprendimientos = [
  {
    id: 1,
    nombre: "Florencia Cochabamba",
    categoria: "Flores",
    descripcion: "Florería especializada en ramos, arreglos y decoración floral para eventos.",
    descripcion_larga:
      "Florencia Cochabamba ofrece arreglos florales, ramos personalizados, decoración de eventos, tortas y detalles para toda ocasión. Su catálogo está pensado para cumpleaños, aniversarios, bodas y regalos especiales.",
    direccion: "Av. América, Cochabamba",
    telefono: "70707070",
    whatsapp: "59170707070",
    calificacion: 4.9,
    resenas_count: 128,
    lat: -17.3735,
    lng: -66.157,
    imagen:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1400&q=80",
    banner:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80",
    secciones: [
      {
        titulo: "Tortas y Pasteles",
        emoji: "🎂",
        productos: [
          {
            id: 1,
            codigo: "T01",
            nombre: "Torta Matilda",
            descripcion: "Torta húmeda de chocolate con crema suave y cobertura intensa.",
            descripcion_larga:
              "Una torta intensa de chocolate, ideal para cumpleaños y celebraciones. Tiene capas suaves, relleno cremoso y una cobertura brillante que resalta su sabor.",
            precio: 230,
            imagen:
              "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
            tamanos: ["8 porciones", "12 porciones", "20 porciones"],
          },
        ],
      },
    ],
  },
];

export const categorias = ["Todos", "Flores", "Comida", "Ropa"];

export const usuario = {
  nombre: "Cori Ayelen",
  correo: "cori@emprendego.com",
  telefono: "70707070",
  ciudad: "Cochabamba",
};

export const resenas = [
  {
    id: 1,
    emprendimiento: "Florencia Cochabamba",
    comentario: "Muy buena atención y entrega rápida.",
    calificacion: 5,
  },
  {
    id: 2,
    emprendimiento: "Dulce Encanto",
    comentario: "La torta llegó hermosa y con buen sabor.",
    calificacion: 4,
  },
];