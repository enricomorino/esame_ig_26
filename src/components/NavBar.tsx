import { Link, NavLink } from 'react-router-dom'
import { useAppState } from '../state/AppState'
import './NavBar.css'

export function NavBar() {
  const { state } = useAppState()
  const bookmarkCount = Object.keys(state.bookmarks).length
  const ticketCount = state.tickets.length

  return (
    <header className="nav">
      <Link to="/" className="brand">KB Helpdesk</Link>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/kb" className={({ isActive }) => (isActive ? 'active' : '')}>Articoli</NavLink>
        <NavLink to="/ticket/new" className={({ isActive }) => (isActive ? 'active' : '')}>Nuovo Ticket</NavLink>
      </nav>
      <div className="nav-meta">
        <span>Bookmark: {bookmarkCount}</span>
        <span>Ticket: {ticketCount}</span>
      </div>
    </header>
  )
}
