import { Router } from 'express';
import { PostsController } from '../controllers/posts.controller';

const router = Router();

// 포스트 정보 요청
router.get('/:id', PostsController.requestPost);
// 포스트 등록
router.post('/', PostsController.createPost);

export default router;
