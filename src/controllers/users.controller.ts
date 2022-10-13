import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { UserCreate, UserUpdate, UserDelete } from '../interfaces/index';

// 회원가입
export const UsersController = {
  createUser: async (req: Request, res: Response) => {
    // DTO 생성
    const { email, password, nickname, name, kakao_id } = req.body;
    const userDTO: UserCreate = {
      email,
      password,
      nickname,
      name,
      kakao_id,
    };

    // Service
    const result = await UsersService.createUser(userDTO);
    const { status, message } = result;

    // 응답
    res.status(status).json(message);
  },

  readUser: async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    // Service
    const result = await UsersService.readUser(userId);
    const { status, ...response } = result;

    // 응답
    res.status(status).json(response);
  },

  updateUser: async (req: Request, res: Response) => {
    const { nickname, password, profile_image } = req.body;
    const userDTO: UserUpdate = { nickname, password, profile_image };
    Object.keys(userDTO).forEach(
      (key) => userDTO[key] == null && delete userDTO[key],
    );

    // Service
    const result: { status: number; message: string } =
      await UsersService.updateUser(userDTO);
    const { status, message } = result;

    // 응답
    res.status(status).json(message);
  },

  deleteUser: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { password } = req.body;

    const userDTO: UserDelete = { id, password };
    // console.log(userDTO);
    // Service
    const result = await UsersService.deleteUser(userDTO);
    const { status, message } = result;

    // 응답
    res.status(status).json(message);
  },
};
