import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { loginAuthenticator } from '../middlewares/authentication/authenticator';

const router = Router();

// 로그인
router.post(
  '/login',
  loginAuthenticator.isNotLoggedIn,
  AuthController.loginLocal,
  AuthController.login,
);

export default router;
