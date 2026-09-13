import EventCard from '../components/EventCard'
import { events } from '../data/events'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { user } = useAuth()

  return (
    <main>
      <section className="hero">
        <h1>Encontre seu próximo evento</h1>

        <p>
          Descubra eventos, workshops e encontros de tecnologia perto de você.
        </p>

        <input
          type="text"
          placeholder="Pesquisar eventos..."
        />

        <div>
          {user ? (
            <Link to="/events/create">
              <button>Criar evento</button>
            </Link>
          ) : (
            <Link to="/login">
              <button>Faça login para criar um evento</button>
            </Link>
          )}
        </div>
      </section>

      <section className="events-section">
        <h2>Próximos eventos</h2>

        <div className="events-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home