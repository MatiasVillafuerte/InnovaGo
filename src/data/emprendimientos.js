export const emprendimientos = [
  {
    id: 1,
    nombre: "Verde & Flores",
    categoria: "Flores",
    descripcion:
      "Florería artesanal con ramos frescos, arreglos personalizados y entrega rápida.",
    direccion: "Av. América, Cochabamba",
    telefono: "70707070",
    whatsapp: "59170707070",
    calificacion: 4.9,
    imagen:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
    x: 25,
    y: 35,
    productos: [
      {
        id: 1,
        nombre: "Ramo Primavera",
        precio: 85,
        imagen:
          "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: 2,
        nombre: "Caja de Girasoles",
        precio: 95,
        imagen:
          "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: 2,
    nombre: "Antojitos Caseros",
    categoria: "Comida",
    descripcion: "Comida casera, postres y snacks para pedidos diarios.",
    direccion: "Cala Cala, Cochabamba",
    telefono: "71717171",
    whatsapp: "59171717171",
    calificacion: 4.7,
    imagen:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
    x: 68,
    y: 30,
    productos: [
      {
        id: 3,
        nombre: "Menú ejecutivo",
        precio: 25,
        imagen:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: 3,
    nombre: "Moda Local",
    categoria: "Ropa",
    descripcion: "Ropa casual, accesorios y prendas personalizadas.",
    direccion: "Centro, Cochabamba",
    telefono: "72727272",
    whatsapp: "59172727272",
    calificacion: 4.6,
    imagen:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
    x: 48,
    y: 68,
    productos: [
      {
        id: 4,
        nombre: "Polera oversize",
        precio: 75,
        imagen:
          "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: 4,
    nombre: "Tecno Soluciones",
    categoria: "Tecnología",
    descripcion: "Accesorios tecnológicos, mantenimiento y soporte básico.",
    direccion: "Av. Heroínas, Cochabamba",
    telefono: "73737373",
    whatsapp: "59173737373",
    calificacion: 4.8,
    imagen:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    x: 82,
    y: 75,
    productos: [
      {
        id: 5,
        nombre: "Soporte técnico",
        precio: 50,
        imagen:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

export const categorias = ["Todos", "Flores", "Comida", "Ropa", "Tecnología"];

export const usuario = {
  nombre: "Cori Ayelen",
  correo: "cori@emprendego.com",
  telefono: "70707070",
  ciudad: "Cochabamba",
};

export const resenas = [
  {
    id: 1,
    emprendimiento: "Verde & Flores",
    comentario: "Muy buena atención y entrega rápida.",
    calificacion: 5,
  },
  {
    id: 2,
    emprendimiento: "Antojitos Caseros",
    comentario: "La comida llegó caliente y con buen sabor.",
    calificacion: 4,
  },
];