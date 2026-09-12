import { useParams } from 'react-router-dom'

function EventDetails() {
  const { id } = useParams()

  return (
    <main>
      <h1>Detalhes do evento</h1>
      <p>ID do evento: {id}</p>
    </main>
  )
}

export default EventDetails