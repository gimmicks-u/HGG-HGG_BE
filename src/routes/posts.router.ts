import { Router } from 'express';
import { PostsController } from '../controllers/posts.controller';
import { loginAuthenticator } from '../middlewares/authentication/authenticator';

const router = Router();

// 포스트 정보 요청
router.get('/:id', PostsController.requestPost);

// Authentication - 로그인 되어있는지 체크
// 이하 라우터들은 인증을 거치게 됨
router.use(loginAuthenticator.isLoggedIn);

// 포스트 등록
router.post('/', PostsController.createPost);
// 포스트 수정
router.patch('/:id', PostsController.updatePost);
// 포스트 삭제
router.delete('/:id', PostsController.deletePost);

export default router;
