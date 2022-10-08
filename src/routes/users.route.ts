import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';

const router = Router();

//회원가입
router.post('/', UsersController.createUser);

export default router;
