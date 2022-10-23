import { Request, Response, NextFunction } from 'express';

export const loginAuthenticator = {
  isLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    req.isAuthenticated()
      ? next()
      : res.status(401).json({ message: '로그인된 사용자가 아닙니다.' });
  },
  isNotLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    req.isAuthenticated()
      ? res.status(400).json({ message: '이미 로그인 되어있습니다' })
      : next();
  },
};
