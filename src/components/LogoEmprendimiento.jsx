import {
  FaLeaf,
  FaUtensils,
  FaTshirt,
  FaLaptopCode,
  FaHome,
  FaStore,
} from "react-icons/fa";

export default function LogoEmprendimiento({ categoria, size = "md" }) {
  const categorias = {
    Flores: {
      icono: <FaLeaf />,
      clase: "logo-flores",
    },
    Comida: {
      icono: <FaUtensils />,
      clase: "logo-comida",
    },
    Ropa: {
      icono: <FaTshirt />,
      clase: "logo-ropa",
    },
    Tecnología: {
      icono: <FaLaptopCode />,
      clase: "logo-tecnologia",
    },
    Decoración: {
      icono: <FaHome />,
      clase: "logo-decoracion",
    },
  };

  const data = categorias[categoria] || {
    icono: <FaStore />,
    clase: "logo-default",
  };

  return (
    <div className={`logo-negocio ${size} ${data.clase}`}>
      {data.icono}
    </div>
  );
}