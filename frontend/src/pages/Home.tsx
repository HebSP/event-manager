import EventCard from '../components/EventCard'
import { events } from '../data/events'

function Home() {
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