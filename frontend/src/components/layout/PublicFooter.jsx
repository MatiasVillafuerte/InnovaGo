export default function PublicFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>InnovaGO</strong>
        <span>Plataforma de emprendimientos locales en Bolivia.</span>
      </div>
      <span>© {new Date().getFullYear()} InnovaGO. Todos los derechos reservados.</span>
    </footer>
  )
}
