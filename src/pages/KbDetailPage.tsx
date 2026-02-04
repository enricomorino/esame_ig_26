import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchPostById } from '../api/dummyjson'
import type { Post } from '../api/dummyjson'
import { useAppState } from '../state/AppState'
import './KbDetailPage.css'

export function KbDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    fetchPostById(Number(id))
      .then(setPost)
      .catch(() => setError('Impossibile caricare l\'articolo'))
      .finally(() => setLoading(false))
  }, [id])

  const bookmarked = post ? Boolean(state.bookmarks[post.id]) : false

  const toggleBookmark = () => {
    if (!post) return
    if (bookmarked) {
      dispatch({ type: 'REMOVE_BOOKMARK', payload: post.id })
    } else {
      dispatch({ type: 'ADD_BOOKMARK', payload: { id: post.id, title: post.title } })
    }
  }

  if (loading) return <p className="muted">Caricamento...</p>
  if (error) return <p className="error">{error}</p>
  if (!post) return null

  return (
    <div className="page">
      <button className="ghost" onClick={() => navigate(-1)}>Torna</button>
      <header className="detail-header">
        <div>
          <div className="muted">ID {post.id}</div>
          <h1>{post.title}</h1>
        </div>
        <div className="actions">
          <button className="ghost" onClick={toggleBookmark}>
            {bookmarked ? 'Rimuovi Bookmark' : 'Aggiungi Bookmark'}
          </button>
          <Link to="/kb" className="primary">Lista</Link>
        </div>
      </header>
      <p className="body">{post.body}</p>
      <div className="tag-row">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  )
}
