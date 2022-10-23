export interface PostID {
  postId: number;
}

export interface PostCreate {
  title: string;
  content: string;
  groupStatus: string;
  meetingDate: string;
  userId: number;
}

export interface PostUpdate {
  postId: number;
  title: string;
  content: string;
  groupStatus: string;
  meetingDate: string;
  userId: number;
}

export interface PostDelete {
  postId: number;
  userId: number;
}
