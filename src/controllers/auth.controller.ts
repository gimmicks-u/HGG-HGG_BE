import { NextFunction, Request, Response } from 'express';
import { LoginInterFace } from 'interfaces/auth.interfaces';
import { AuthService } from '../services/Auth.service';

export const AuthController = {
  //로그인
  login: async (req: Request, res: Response) => {
    console.log('loginLocal 종료 및 로그인 시작');
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

  logout: async (req: Request, res: Response) => {
    const result = await AuthService.logout(res);

    const { status, message } = result;
    res.status(status).json(message);
  },

  //인국 추가
  loginLocal: async (req: Request, res: Response, next: NextFunction) => {
    console.log('Controller loginLocal 시작');
    AuthService.loginLocal(req, res, next);
  },
};
