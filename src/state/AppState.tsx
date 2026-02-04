import { createContext, useContext, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'

export type ArticleBookmark = { id: number; title: string }
export type TicketPriority = 'Low' | 'Medium' | 'High'
export type Ticket = {
  id: string
  title: string
  description: string
  priority: TicketPriority
  articleId?: number
  email?: string
  createdAt: string
}

type AppState = {
  bookmarks: Record<number, ArticleBookmark>
  tickets: Ticket[]
}

type AppAction =
  | { type: 'ADD_BOOKMARK'; payload: ArticleBookmark }
  | { type: 'REMOVE_BOOKMARK'; payload: number }
  | { type: 'ADD_TICKET'; payload: Ticket }

const initialState: AppState = {
  bookmarks: {},
  tickets: [],
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: { ...state.bookmarks, [action.payload.id]: action.payload },
      }
    case 'REMOVE_BOOKMARK': {
      const next = { ...state.bookmarks }
      delete next[action.payload]
      return { ...state, bookmarks: next }
    }
    case 'ADD_TICKET':
      return { ...state, tickets: [action.payload, ...state.tickets] }
    default:
      return state
  }
}

const AppStateContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
