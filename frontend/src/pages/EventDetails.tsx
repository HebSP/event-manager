import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { events } from '../data/events'

function EventDetails() {
  const { id } = useParams()

  const event = events.find((event) => event.id === Number(id))

  const [isRegistered, setIsRegistered] = useState(false)

  if (!event) {
    return (
      <main>
        <h1>Evento não encontrado</h1>
      </main>
    )
  }

  const handleRegistration = () => {
    setIsRegistered(!isRegistered)
  }

  return (
    <main>
      <h1>{event.title}</h1>

      <p>Data: {event.date}</p>
      <p>Local: {event.location}</p>

      <p>
        Inscritos: {event.registered} / {event.capacity}
      </p>

      <button onClick={handleRegistration}>
        {isRegistered ? 'Cancelar inscrição' : 'Inscrever-se'}
      </button>
    </main>
  )
}

export default EventDetails