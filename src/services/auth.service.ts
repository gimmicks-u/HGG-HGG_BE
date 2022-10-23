import { Request, Response, NextFunction } from 'express';
import { User } from '../db/entity/user';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginInterFace } from 'interfaces/auth.interfaces';
import * as jwt from 'jsonwebtoken';

//인국추가//
import { Passport } from '../middlewares/package/passport';

export const AuthService = {
  login: async (userDTO: LoginInterFace) => {
    // 이메일 존재 확인
    const userFromDB = await getRepository(User).findOneBy({
      email: userDTO.email,
      deleted_at: null,
    });

    if (!userFromDB) {
      return { message: '로그인 정보를 확인해주세요.', status: 400 };
    }

    // 비밀번호 확인
    const isMatchedPassword = await bcrypt.compare(
      userDTO.password,
      userFromDB.password,
    );

    if (!isMatchedPassword) {
      return { message: '로그인 정보를 확인해주세요.', status: 400 };
    }
    // console.log(userFromDB);
    // 토큰 발급
    try {
      // access token 발급
      const accessToken = jwt.sign(
        {
          id: userFromDB.id,
          email: userFromDB.email,
          nickname: userFromDB.nickname,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: process.env.ACCESS_EXPIRE,
          issuer: process.env.TOKEN_ISSUER,
        },
      );

      // refresh token 발급 -- later
      // const refreshToken = jwt.sign(
      //   {
      //     id: userFromDB.id,
      //     email: userFromDB.email,
      //     nickname: userFromDB.nickname,
      //   },
      //     expiresIn: process.env.ACCESS_EXPIRE,
      //     issuer: process.env.TOKEN_ISUUER,
      // );

      return {
        message: '로그인에 성공하셨습니다.',
        status: 200,
        accessToken,
      };
    } catch (err) {
      console.log(err);
      return { message: '로그인 정보를 확인해주세요.', status: 400 };
    }
  },
  logout: async (res: Response) => {
    // access 토큰 초기화
    res.cookie('accessToken', '');
    return {
      message: '로그아웃 되었습니다.',
      status: 200,
    };
  },

  //인국 추가
  loginLocal: async (req: Request, res: Response, next: NextFunction) => {
    console.log('Service loginLocal 시작');
    Passport.authenticate('local')(req, res, next);
  },
};
