import { useEffect, useMemo, useState } from 'react'
import { ArticleCard } from '../components/ArticleCard'
import { Pagination } from '../components/Pagination'
import { fetchPosts, searchPosts } from '../api/dummyjson'
import type { Post } from '../api/dummyjson'
import { useAppState } from '../state/AppState'
import './KbListPage.css'

const PAGE_SIZE = 10

export function KbListPage() {
  const { state, dispatch } = useAppState()
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState('')
  const [cooldown, setCooldown] = useState(false)

  const bookmarkedIds = useMemo(() => new Set(Object.keys(state.bookmarks).map(Number)), [state.bookmarks])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    const skip = page * PAGE_SIZE
    const fetcher = query ? searchPosts(query, PAGE_SIZE, skip) : fetchPosts(PAGE_SIZE, skip)
    fetcher
      .then((res) => {
        if (!active) return
        setPosts(res.posts)
        setTotal(res.total)
      })
      .catch(() => {
        if (!active) return
        setError('Errore di rete, riprova')
        setPosts([])
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [page, query])

  const toggleBookmark = (post: Post) => {
    if (bookmarkedIds.has(post.id)) {
      dispatch({ type: 'REMOVE_BOOKMARK', payload: post.id })
    } else {
      dispatch({ type: 'ADD_BOOKMARK', payload: { id: post.id, title: post.title } })
    }
  }

  const handleSearch = () => {
    setCooldown(true)
    setTimeout(() => setCooldown(false), 400)
    setPage(0)
    setQuery(searchTerm.trim())
  }

  return (
    <div className="page">
      <header className="list-header">
        <div>
          <h1>Knowledge Base</h1>
          <p className="muted">Ricerca e naviga tra gli articoli</p>
        </div>
        <div className="search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cerca per testo"
          />
          <button onClick={handleSearch} disabled={cooldown || loading}>
            Cerca
          </button>
        </div>
      </header>

      {loading && <p className="muted">Caricamento...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && posts.length === 0 && <p className="muted">Nessun articolo trovato</p>}

      <div className="grid">
        {posts.map((post) => (
          <ArticleCard
            key={post.id}
            post={post}
            bookmarked={bookmarkedIds.has(post.id)}
            onToggleBookmark={toggleBookmark}
          />
        ))}
      </div>

      <Pagination
        page={page}
        pageSize={PAGE_SIZE}
        total={total || PAGE_SIZE}
        onPageChange={setPage}
        loading={loading}
      />
    </div>
  )
}
