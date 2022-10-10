import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

// 로그인
router.post('/', AuthController.login);

export default router;
