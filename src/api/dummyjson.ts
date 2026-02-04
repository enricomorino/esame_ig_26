export type Post = {
  id: number
  title: string
  body: string
  tags: string[]
}

export type PostListResponse = {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

const BASE_URL = 'https://dummyjson.com'

async function http<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error('Network response was not ok')
  return res.json() as Promise<T>
}

export function fetchPosts(limit: number, skip: number) {
  return http<PostListResponse>(`/posts?limit=${limit}&skip=${skip}`)
}

export function searchPosts(term: string, limit: number, skip: number) {
  const encoded = encodeURIComponent(term)
  return http<PostListResponse>(`/posts/search?q=${encoded}&limit=${limit}&skip=${skip}`)
}

export function fetchPostById(id: number) {
  return http<Post>(`/posts/${id}`)
}
