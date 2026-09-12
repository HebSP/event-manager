import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <h2>Event Manager</h2>
        </Link>

        <nav>
          <Link to="/">Eventos</Link>
          <Link to="/login">Entrar</Link>
          <Link to="/register">Criar conta</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header