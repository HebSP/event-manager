import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import {
  getEvent,
  getParticipants,
  registerEvent,
  unregisterEvent,
  deleteEvent,
  type Event,
} from '../services/api'

import { useAuth } from '../context/AuthContext'

type Participant = {
  id: number
  name: string
  email: string
}

function EventDetails() {
  const { id } = useParams()
  const { user } = useAuth()

  const [event, setEvent] = useState<Event | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return

    Promise.all([
      getEvent(Number(id)),
      getParticipants(Number(id)),
    ])
      .then(([eventData, participantsData]) => {
        setEvent(eventData)
        setParticipants(participantsData)
      })
      .catch((error) => {
        console.error(error)
        setError('Não foi possível carregar o evento.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  const isRegistered = user
    ? participants.some((participant) => participant.id === user.id)
    : false

  const handleRegistration = async () => {
    if (!event || !user) return

    setActionLoading(true)
    setError('')

    try {
      if (isRegistered) {
        await unregisterEvent(event.id)

        setParticipants((currentParticipants) =>
          currentParticipants.filter(
            (participant) => participant.id !== user.id
          )
        )

        setEvent({
          ...event,
          registered: event.registered - 1,
        })
      } else {
        await registerEvent(event.id)

        setParticipants((currentParticipants) => [
          ...currentParticipants,
          {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        ])

        setEvent({
          ...event,
          registered: event.registered + 1,
        })
      }
    } catch (error) {
      console.error(error)
      setError('Não foi possível realizar a operação.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!event) return

    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este evento?'
    )

    if (!confirmed) return

    try {
      await deleteEvent(event.id)

      navigate('/')
    } catch (error) {
      console.error(error)
      setError('Não foi possível excluir o evento.')
    }
  }

  if (loading) {
    return <p>Carregando evento...</p>
  }

  if (!event) {
    return <p>{error || 'Evento não encontrado.'}</p>
  }

  const isOwner = user?.id === event.created_by

  return (
    <main>
      <h1>{event.title}</h1>

      <p>{event.description}</p>

      <p>Data: {event.date}</p>

      <p>Local: {event.location}</p>

      <p>
        Inscritos: {event.registered} / {event.capacity}
      </p>

      {user ? (
        <button
          onClick={handleRegistration}
          disabled={actionLoading}
        >
          {actionLoading
            ? 'Aguarde...'
            : isRegistered
              ? 'Cancelar inscrição'
              : 'Inscrever-se'}
        </button>
      ) : (
        <p>Faça login para se inscrever neste evento.</p>
      )}
      {isOwner && (
        <div>
          <button onClick={() => navigate(`/events/${event.id}/edit`)}>
            Editar evento
          </button>

          <button onClick={handleDelete}>
            Excluir evento
          </button>
        </div>
      )}

      {error && <p>{error}</p>}

    </main>
  )
}

export default EventDetails
