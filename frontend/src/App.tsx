import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import EventDetails from './pages/EventDetails'
import CreateEvent from './pages/CreateEvent'

import { AuthProvider } from './context/AuthContext'

import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App