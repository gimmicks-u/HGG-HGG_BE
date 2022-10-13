import { Router } from 'express';
import { PostsController } from '../controllers/posts.controller';

const router = Router();

// 포스트 정보 요청
router.get('/:id', PostsController.requestPost);
// 포스트 등록
router.post('/', PostsController.createPost);
// 포스트 수정
router.patch('/:id', PostsController.updatePost);
// 포스트 삭제
router.delete('/:id', PostsController.deletePost);

export default router;
