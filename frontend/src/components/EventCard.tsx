import { Link } from 'react-router-dom'

type Event = {
  id: number
  title: string
  date: string
  location: string
  capacity: number
  registered: number
}

type EventCardProps = {
  event: Event
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="event-card">
      <h3>{event.title}</h3>

      <p>{event.date}</p>
      <p>{event.location}</p>

      <p>
        {event.registered} / {event.capacity} inscritos
      </p>

      <Link to={`/events/${event.id}`}>
        <button>Ver detalhes</button>
      </Link>
    </article>
  )
}

export default EventCard