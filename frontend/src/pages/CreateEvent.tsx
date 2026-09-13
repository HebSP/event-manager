import { useState } from 'react'

function CreateEvent() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setError('')
    setSuccess(false)

    if (!title || !date || !location || !capacity) {
      setError('Preencha todos os campos.')
      return
    }

    if (Number(capacity) < 1) {
      setError('A capacidade deve ser maior que zero.')
      return
    }

    console.log({
      title,
      date,
      location,
      capacity: Number(capacity),
    })

    setSuccess(true)
  }

  return (
    <main>
      <h1>Criar evento</h1>

      {error && <p>{error}</p>}

      {success && <p>Evento criado com sucesso!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="date">Data</label>

          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="location">Local</label>

          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="capacity">Capacidade</label>

          <input
            id="capacity"
            type="number"
            min="1"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
          />
        </div>

        <button type="submit">
          Criar evento
        </button>
      </form>
    </main>
  )
}

export default CreateEvent