import { Link, useLocation } from 'react-router-dom'
import { useAppState } from '../state/AppState'
import './HomePage.css'

export function HomePage() {
  const { state } = useAppState()
  const location = useLocation()
  const success = (location.state as { success?: string } | null)?.success
  const bookmarks = Object.values(state.bookmarks)
  const latestTickets = state.tickets.slice(0, 3)

  return (
    <div className="page">
      {success && <div className="success">{success}</div>}
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <p>Articoli salvati</p>
          <strong>{bookmarks.length}</strong>
        </div>
        <div className="stat-card">
          <p>Ticket aperti</p>
          <strong>{state.tickets.length}</strong>
        </div>
      </div>

      <section className="panel">
        <header className="panel-header">
          <h2>Ultimi ticket</h2>
          <Link to="/ticket/new" className="primary">Nuovo ticket</Link>
        </header>
        {latestTickets.length === 0 ? (
          <p className="muted">Nessun ticket creato</p>
        ) : (
          <ul className="ticket-list">
            {latestTickets.map((t) => (
              <li key={t.id}>
                <div>
                  <strong>{t.title}</strong>
                  <span className="muted"> · {t.priority}</span>
                </div>
                <div className="muted small">{new Date(t.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel">
        <header className="panel-header">
          <h2>Bookmark</h2>
          <Link to="/kb" className="link">Vai alla knowledge base</Link>
        </header>
        {bookmarks.length === 0 ? (
          <p className="muted">Nessun articolo salvato</p>
        ) : (
          <div className="bookmark-grid">
            {bookmarks.map((b) => (
              <div key={b.id} className="bookmark-card">
                <div>
                  <div className="muted">ID {b.id}</div>
                  <strong>{b.title}</strong>
                </div>
                <Link to={`/kb/${b.id}`} className="primary">Apri</Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
