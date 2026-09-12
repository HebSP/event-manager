export type Event = {
  id: number
  title: string
  date: string
  location: string
  capacity: number
  registered: number
}

export const events: Event[] = [
  {
    id: 1,
    title: 'Workshop de React',
    date: '20/09/2026',
    location: 'Recife - PE',
    capacity: 30,
    registered: 17,
  },
  {
    id: 2,
    title: 'Hackathon de Tecnologia',
    date: '25/09/2026',
    location: 'Recife - PE',
    capacity: 50,
    registered: 42,
  },
  {
    id: 3,
    title: 'Encontro de Desenvolvedores',
    date: '02/10/2026',
    location: 'Recife - PE',
    capacity: 100,
    registered: 68,
  },
]