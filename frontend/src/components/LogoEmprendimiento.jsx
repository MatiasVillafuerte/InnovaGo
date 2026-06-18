export default function LogoEmprendimiento({
  emprendimiento,
  categoria,
  size = "md",
}) {
  const logo = emprendimiento?.logo;

  const inicial =
    emprendimiento?.nombre?.charAt(0) || categoria?.charAt(0) || "E";

  return (
    <div className={`logo-negocio-img ${size}`}>
      {logo ? (
        <img src={logo} alt={emprendimiento?.nombre || categoria} />
      ) : (
        <span>{inicial}</span>
      )}
    </div>
  );
}