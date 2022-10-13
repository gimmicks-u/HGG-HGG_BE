export interface UserCreate {
  email: string;
  password: string;
  nickname: string;
  name: string;
  kakao_id: string;
}

export interface UserUpdate {
  nickname?: string;
  password?: string;
  profile_image?: string;
}

export interface UserDelete {
  id: number;
  password: string;
}
