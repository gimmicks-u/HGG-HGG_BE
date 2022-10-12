import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

// 로그인
router.post('/login', AuthController.login);

// 로그아웃
router.get('/logout', AuthController.logout);
export default router;
