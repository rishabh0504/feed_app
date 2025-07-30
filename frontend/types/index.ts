export interface Post {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  liked: number;
  disliked: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
}
