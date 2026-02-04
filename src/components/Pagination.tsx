import './Pagination.css'

type Props = {
  page: number
  pageSize: number
  total: number
  onPageChange: (next: number) => void
  loading?: boolean
}

export function Pagination({ page, pageSize, total, onPageChange, loading }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const canPrev = page > 0
  const canNext = page + 1 < totalPages

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={!canPrev || loading}>Prev</button>
      <span>Pagina {page + 1} / {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={!canNext || loading}>Next</button>
    </div>
  )
}
