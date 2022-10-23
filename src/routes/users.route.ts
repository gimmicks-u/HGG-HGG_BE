import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { loginAuthenticator } from '../middlewares/authentication/authenticator';

const router = Router();

// 회원가입
router.post('/', UsersController.createUser); //Q.아래로 내려야하는가?

/// 인국 작성 ///
router.get('/email', UsersController.checkEmail);

router.get('/nickname', UsersController.checkNickname);

// Authentication - 로그인 되어있는지 체크
// 이하 라우터들은 인증을 거치게 됨
router.use(loginAuthenticator.isLoggedIn);

/// 인국 작성 ///

export default router;
