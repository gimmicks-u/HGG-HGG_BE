import { Request, Response } from 'express';
import { LoginInterFace } from 'interfaces/auth.interfaces';
import { AuthService } from '../services/Auth.service';

// 회원가입
export const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userDTO: LoginInterFace = {
      email,
      password,
    };
    // console.log(userDTO);
    const result = await AuthService.login(userDTO);
    const { status, message, accessToken } = result;

    res.cookie('accessToken', accessToken, {
      secure: false,
      httpOnly: true,
    });

    // 응답
    res.status(status).json(message);
  },
};
