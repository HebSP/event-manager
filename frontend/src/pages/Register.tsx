import { useState } from 'react'
//import { useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

//  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setError('')
    setSuccess(false)

    if (!name || !email || !password) {
      setError('Preencha todos os campos.')
      return
    }

    if (!email.includes('@')) {
      setError('Digite um e-mail válido.')
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    console.log({
      name,
      email,
      password,
    })

    setSuccess(true)
  }

  return (
    <main>
      <h1>Criar conta</h1>

      {error && <p>{error}</p>}

      {success && (
        <p>
          Conta criada com sucesso!
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

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
          Criar conta
        </button>
      </form>
    </main>
  )
}

export default Register