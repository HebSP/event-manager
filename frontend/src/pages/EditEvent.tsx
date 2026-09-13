import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getEvent, updateEvent, type Event } from '../services/api'

function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState<Event | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    getEvent(Number(id))
      .then((data) => {
        setEvent(data)

        setTitle(data.title)
        setDescription(data.description)
        setDate(data.date.slice(0, 16))
        setLocation(data.location)
        setCapacity(String(data.capacity))
      })
      .catch((error) => {
        console.error(error)
        setError('Não foi possível carregar o evento.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!id) return

    setError('')

    if (!title || !description || !date || !location || !capacity) {
      setError('Preencha todos os campos.')
      return
    }

    if (Number(capacity) < 1) {
      setError('A capacidade deve ser maior que zero.')
      return
    }

    setSaving(true)

    try {
      await updateEvent(Number(id), {
        title,
        description,
        date,
        location,
        capacity: Number(capacity),
      })

      navigate(`/events/${id}`)
    } catch (error) {
      console.error(error)
      setError('Não foi possível atualizar o evento.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p>Carregando evento...</p>
  }

  if (!event) {
    return <p>{error || 'Evento não encontrado.'}</p>
  }

  return (
    <main>
      <h1>Editar evento</h1>

      {error && <p>{error}</p>}

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
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="date">Data</label>
          <input
            id="date"
            type="datetime-local"
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

        <button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </form>
    </main>
  )
}

export default EditEvent