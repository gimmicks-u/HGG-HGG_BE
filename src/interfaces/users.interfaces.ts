export interface UserCreate {
  email: string;
  password: string;
  nickname: string;
  name: string;
  kakao_id: string;
}

export interface UserEmail {
  email: string;
}

export interface UserNickName {
  nickname: string;
}
