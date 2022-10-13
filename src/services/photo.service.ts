import { Response, Request, NextFunction } from 'express';
import { upload } from '../middlewares/package/multer';

export const PhotoService = {
  uploadPhoto: (req: Request, res: Response, next: NextFunction) => {
    try {
      upload.single('photo')(req, res, next);
    } catch (err) {
      return { message: '잘못된 요청입니다', status: 400 };
    }
  },
};
