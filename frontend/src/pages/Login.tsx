import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setError('')

    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }

    if (!email.includes('@')) {
      setError('Digite um e-mail válido.')
      return
    }

    login({
      name: 'Usuário',
      email,
    })

    navigate('/')
  }

  return (
    <main>
      <h1>Entrar</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">
          Entrar
        </button>
      </form>
    </main>
  )
}

export default Login