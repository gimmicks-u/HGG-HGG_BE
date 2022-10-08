import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { UserCreate } from '../interfaces/index';

// 회원가입
export const UsersController = {
  createUser: async (req: Request, res: Response) => {
    // DTO 생성
    const { email, password, nickname, name, kakao_id } = req.body;
    const userDTO: UserCreate = { email, password, nickname, name, kakao_id };

    // Service
    const result = await UsersService.createUser(userDTO);
    const { status, message } = result;

    // 응답
    res.status(status).json(message);
  },
};
