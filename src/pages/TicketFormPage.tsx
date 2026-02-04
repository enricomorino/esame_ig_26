import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField } from '../components/FormField'
import { useAppState } from '../state/AppState'
import type { TicketPriority } from '../state/AppState'
import './TicketFormPage.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function TicketFormPage() {
  const { state, dispatch } = useAppState()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TicketPriority>('Medium')
  const [articleId, setArticleId] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const bookmarkOptions = useMemo(() => Object.values(state.bookmarks), [state.bookmarks])

  const validate = () => {
    const next: Record<string, string> = {}
    if (title.trim().length < 5) next.title = 'Minimo 5 caratteri'
    if (description.trim().length < 20) next.description = 'Minimo 20 caratteri'
    if (email && !emailRegex.test(email)) next.email = 'Email non valida'
    return next
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const now = new Date().toISOString()
    const ticketId = crypto.randomUUID()
    dispatch({
      type: 'ADD_TICKET',
      payload: {
        id: ticketId,
        title: title.trim(),
        description: description.trim(),
        priority,
        articleId: articleId ? Number(articleId) : undefined,
        email: email || undefined,
        createdAt: now,
      },
    })
    navigate('/', { state: { success: 'Ticket creato correttamente' } })
  }

  return (
    <div className="page form-page">
      <h1>Nuovo Ticket</h1>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <FormField label="Titolo" htmlFor="title" error={errors.title}>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Problema riscontrato"
            required
          />
        </FormField>

        <FormField label="Descrizione" htmlFor="description" error={errors.description}>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Descrivi il problema"
            required
          />
        </FormField>

        <FormField label="Priorità" htmlFor="priority">
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as TicketPriority)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </FormField>

        <FormField label="Riferimento articolo (facoltativo)" htmlFor="article">
          <select id="article" value={articleId} onChange={(e) => setArticleId(e.target.value)}>
            <option value="">Nessuno</option>
            {bookmarkOptions.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Email (facoltativa)" htmlFor="email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="utente@example.com"
          />
        </FormField>

        <button type="submit" className="primary submit">Crea ticket</button>
      </form>
    </div>
  )
}
