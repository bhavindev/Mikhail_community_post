export interface Comment {
  id: string;
  text: string;
  author?: string;
  replies: Comment[];
  imageUrl?: string;
}

export interface Post {
  id: string;
  text: string;
  comments: Comment[];
  imageUrl?: string | null;
  author: string;
}
