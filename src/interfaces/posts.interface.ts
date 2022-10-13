export interface PostID {
  post_id: number;
}

export interface PostCreate {
  title: string;
  content: string;
  group_status: string;
  meeting_date: string;
  user_id: number;
}

export interface PostUpdate {
  post_id: number;
  title: string;
  content: string;
  group_status: string;
  meeting_date: string;
  user_id: number;
}

export interface PostDelete {
  post_id: number;
  user_id: number;
}
