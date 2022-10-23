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

export interface UserEmail {
  email: string;
}

export interface UserNickName {
  nickname: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
