const API_URL = 'http://127.0.0.1:8000/api'

async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem('token')

  const headers = new Headers(options.headers)

  headers.set('Content-Type', 'application/json')

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error('Erro na requisição')
  }

  return response.json()
}

export type Event = {
  id: number
  title: string
  description: string
  location: string
  date: string
  capacity: number
  registered: number
  created_by: number
  creator: {
    id: number
    name: string
    email: string
  }
}

export async function getEvents() {
  const response = await fetch(`${API_URL}/events`)

  if (!response.ok) {
    throw new Error('Erro ao buscar eventos')
  }

  return response.json()
}

export async function getEvent(id: number) {
  const response = await fetch(`${API_URL}/events/${id}`)

  if (!response.ok) {
    throw new Error('Erro ao buscar evento')
  }

  return response.json()
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (!response.ok) {
    throw new Error('Credenciais inválidas')
  }

  return response.json()
}

export async function createEvent(event: {
  title: string
  description: string
  location: string
  date: string
  capacity: number
}) {
  return apiFetch('/events', {
    method: 'POST',
    body: JSON.stringify(event),
  })
}

export async function registerEvent(id: number) {
  return apiFetch(`/events/${id}/register`, {
    method: 'POST',
  })
}

export async function unregisterEvent(id: number) {
  return apiFetch(`/events/${id}/register`, {
    method: 'DELETE',
  })
}

export async function getParticipants(id: number) {
  return apiFetch(`/events/${id}/participants`)
}

export async function updateEvent(
  id: number,
  event: {
    title: string
    description: string
    location: string
    date: string
    capacity: number
  }
) {
  return apiFetch(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(event),
  })
}

export async function deleteEvent(id: number) {
  return apiFetch(`/events/${id}`, {
    method: 'DELETE',
  })
}
