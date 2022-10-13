import { Router } from 'express';
import { PhotoController } from '../controllers/photo.controller';

const router = Router();

// 로그인
router.post('/', PhotoController.uploadPhoto, PhotoController.afterUploadPhoto);

export default router;
