export interface PostID {
  id: number;
}

export interface PostCreate {
  title: string;
  content: string;
  user_id: number;
}
