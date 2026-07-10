// Ce composant recoit un titre via les props pour rester reutilisable.
function Header({ eyebrow, title }) {
  return (
    <header className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
    </header>
  )
}

export default Header
