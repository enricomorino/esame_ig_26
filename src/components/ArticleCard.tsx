import { Link } from 'react-router-dom'
import type { Post } from '../api/dummyjson'
import './ArticleCard.css'

type Props = {
  post: Post
  bookmarked: boolean
  onToggleBookmark: (post: Post) => void
}

export function ArticleCard({ post, bookmarked, onToggleBookmark }: Props) {
  const excerpt = post.body.length > 80 ? `${post.body.slice(0, 77)}...` : post.body

  return (
    <article className="card">
      <header className="card-header">
        <div>
          <div className="card-id">#{post.id}</div>
          <h3>{post.title}</h3>
        </div>
        <button className="ghost" onClick={() => onToggleBookmark(post)}>
          {bookmarked ? 'Rimuovi' : 'Bookmark'}
        </button>
      </header>
      <p className="card-body">{excerpt}</p>
      <div className="tag-row">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="card-footer">
        <Link to={`/kb/${post.id}`} className="primary">Dettaglio</Link>
      </div>
    </article>
  )
}
