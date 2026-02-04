import { Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { HomePage } from './pages/HomePage'
import { KbListPage } from './pages/KbListPage'
import { KbDetailPage } from './pages/KbDetailPage'
import { TicketFormPage } from './pages/TicketFormPage'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kb" element={<KbListPage />} />
          <Route path="/kb/:id" element={<KbDetailPage />} />
          <Route path="/ticket/new" element={<TicketFormPage />} />
          <Route path="*" element={<p>Pagina non trovata</p>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
