import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <h2>Event Manager</h2>
        </Link>

        <nav>
          <Link to="/">Eventos</Link>

          {user ? (
            <>
              <Link to="/events/create">Criar evento</Link>

              <span>Olá, {user.name}</span>

              <button onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/register">Criar conta</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header