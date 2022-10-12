import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';

const router = Router();

// 회원가입
router.post('/', UsersController.createUser);

// 회원정보 요청
router.get('/:id', UsersController.readUser);

// 회원정보 수정
router.patch('/:id', UsersController.updateUser);
export default router;
