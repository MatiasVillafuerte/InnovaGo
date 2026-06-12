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
          {
            id: 2,
            codigo: "T02",
            nombre: "Selva Negra",
            descripcion: "Torta clásica con chocolate, crema y cerezas.",
            descripcion_larga:
              "Pastel elegante con bizcocho de chocolate, crema suave y cerezas. Perfecta para reuniones familiares y ocasiones especiales.",
            precio: 115,
            imagen:
              "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=900&q=80",
            tamanos: ["8 porciones", "15 porciones"],
          },
          {
            id: 3,
            codigo: "T03",
            nombre: "Torta Ópera",
            descripcion: "Pastel fino de chocolate y café con capas delicadas.",
            descripcion_larga:
              "Elegante pastel compuesto por capas de bizcocho, crema de mantequilla al café y ganache de chocolate. Ideal para quienes buscan un sabor sofisticado.",
            precio: 240,
            imagen:
              "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
            tamanos: ["9 porciones", "15 porciones", "20 porciones"],
          },
          {
            id: 4,
            codigo: "T04",
            nombre: "Torta 3 Leches",
            descripcion: "Torta suave, húmeda y cremosa.",
            descripcion_larga:
              "Torta esponjosa bañada en tres leches, con cobertura delicada y sabor dulce equilibrado.",
            precio: 155,
            imagen:
              "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80",
            tamanos: ["10 porciones", "15 porciones"],
          },
          {
            id: 5,
            codigo: "T05",
            nombre: "Flan Casero",
            descripcion: "Postre clásico con caramelo suave.",
            descripcion_larga:
              "Flan casero preparado con textura cremosa y caramelo artesanal. Ideal para compartir.",
            precio: 104,
            imagen:
              "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=900&q=80",
            tamanos: ["8 porciones", "12 porciones"],
          },
        ],
      },
      {
        titulo: "Para Toda Ocasión",
        emoji: "💐",
        productos: [
          {
            id: 6,
            codigo: "A244",
            nombre: "Ramo de Rosas",
            descripcion: "Ramo elegante con rosas rojas y envoltura premium.",
            descripcion_larga:
              "Ramo de rosas rojas frescas, preparado con envoltura elegante. Ideal para aniversarios, cumpleaños o regalos románticos.",
            precio: 120,
            imagen:
              "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80",
            tamanos: ["12 rosas", "24 rosas", "36 rosas"],
          },
          {
            id: 7,
            codigo: "A234",
            nombre: "Canasta Floral",
            descripcion: "Canasta con flores amarillas y detalles decorativos.",
            descripcion_larga:
              "Canasta floral con tonos cálidos, pensada para regalos alegres y celebraciones familiares.",
            precio: 135,
            imagen:
              "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=900&q=80",
            tamanos: ["Mediana", "Grande"],
          },
          {
            id: 8,
            codigo: "A217",
            nombre: "Ramo Primavera",
            descripcion: "Flores mixtas con tonos vivos y presentación moderna.",
            descripcion_larga:
              "Arreglo floral con flores frescas de temporada, colores vivos y presentación elegante.",
            precio: 90,
            imagen:
              "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=80",
            tamanos: ["Normal", "Premium"],
          },
          {
            id: 9,
            codigo: "A07",
            nombre: "Centro de Mesa",
            descripcion: "Decoración floral para mesas de eventos.",
            descripcion_larga:
              "Centro de mesa floral ideal para bodas, cumpleaños, aniversarios y cenas especiales.",
            precio: 180,
            imagen:
              "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
            tamanos: ["Simple", "Doble"],
          },
          {
            id: 10,
            codigo: "A178",
            nombre: "Detalle Floral",
            descripcion: "Detalle pequeño con flores frescas para regalo.",
            descripcion_larga:
              "Detalle floral minimalista, elegante y económico para regalos rápidos.",
            precio: 65,
            imagen:
              "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
            tamanos: ["Único"],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    nombre: "Dulce Encanto",
    categoria: "Comida",
    descripcion: "Repostería creativa, cupcakes, tortas y detalles dulces para regalo.",
    descripcion_larga:
      "Dulce Encanto ofrece postres personalizados, tortas, cupcakes y cajas dulces para cumpleaños, reuniones y ocasiones especiales.",
    direccion: "Queru Queru, Cochabamba",
    telefono: "74747474",
    whatsapp: "59174747474",
    calificacion: 4.8,
    resenas_count: 92,
    lat: -17.382,
    lng: -66.148,
    imagen:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=80",
    banner:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1600&q=80",
    secciones: [
      {
        titulo: "Postres Destacados",
        emoji: "🧁",
        productos: [
          {
            id: 1,
            codigo: "D01",
            nombre: "Cupcakes x6",
            descripcion: "Cupcakes decorados en caja especial.",
            descripcion_larga:
              "Cupcakes suaves y decorados, perfectos para cumpleaños, regalos y reuniones pequeñas.",
            precio: 42,
            imagen:
              "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80",
            tamanos: ["6 unidades", "12 unidades"],
          },
          {
            id: 2,
            codigo: "D02",
            nombre: "Mini Torta",
            descripcion: "Torta pequeña ideal para regalo.",
            descripcion_larga:
              "Mini torta personalizada con decoración sencilla y sabor casero.",
            precio: 60,
            imagen:
              "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80",
            tamanos: ["Pequeña", "Mediana"],
          },
          {
            id: 3,
            codigo: "D03",
            nombre: "Caja Dulce",
            descripcion: "Caja mixta con brownies y galletas.",
            descripcion_larga:
              "Caja de regalo con variedad de dulces artesanales.",
            precio: 50,
            imagen:
              "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=900&q=80",
            tamanos: ["Normal", "Premium"],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    nombre: "Moda Local",
    categoria: "Ropa",
    descripcion: "Ropa casual, accesorios y prendas personalizadas.",
    descripcion_larga:
      "Moda Local es una tienda de moda con prendas juveniles, accesorios y diseños cómodos para el día a día.",
    direccion: "Centro, Cochabamba",
    telefono: "72727272",
    whatsapp: "59172727272",
    calificacion: 4.6,
    resenas_count: 64,
    lat: -17.389,
    lng: -66.156,
    imagen:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    banner:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80",
    secciones: [
      {
        titulo: "Prendas Destacadas",
        emoji: "👕",
        productos: [
          {
            id: 1,
            codigo: "R01",
            nombre: "Polera Oversize",
            descripcion: "Polera cómoda con estilo urbano.",
            descripcion_larga:
              "Polera oversize de algodón, cómoda y perfecta para outfits casuales.",
            precio: 75,
            imagen:
              "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80",
            tamanos: ["S", "M", "L"],
          },
          {
            id: 2,
            codigo: "R02",
            nombre: "Gorra Urbana",
            descripcion: "Gorra casual ajustable.",
            descripcion_larga:
              "Gorra urbana ajustable, ideal para combinar con prendas casuales.",
            precio: 45,
            imagen:
              "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80",
            tamanos: ["Único"],
          },
          {
            id: 3,
            codigo: "R03",
            nombre: "Chaqueta Denim",
            descripcion: "Chaqueta cómoda para combinar con todo.",
            descripcion_larga:
              "Chaqueta denim resistente, moderna y fácil de combinar.",
            precio: 160,
            imagen:
              "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80",
            tamanos: ["S", "M", "L"],
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