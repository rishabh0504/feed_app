// Global in-memory store for posts
export interface Post {
  id: string
  text: string
  likes: number
  dislikes: number
  createdAt: string
  comments: Comment[]
}

export interface Comment {
  id: string
  text: string
  createdAt: string
}

// Initialize global store
declare global {
  var postsStore: Post[] | undefined
}

if (!global.postsStore) {
  global.postsStore = []
}

export const getPostsStore = (): Post[] => {
  return global.postsStore || []
}

export const setPostsStore = (posts: Post[]): void => {
  global.postsStore = posts
}
