import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';

const router = Router();

// 회원가입
router.post('/', UsersController.createUser);

/// 인국 작성 ///
router.get('/email', UsersController.checkEmail);

router.get('/nickname', UsersController.checkNickname);
/// 인국 작성 ///

export default router;
