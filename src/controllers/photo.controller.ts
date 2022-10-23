import { NextFunction, Request, Response } from 'express';
import { PhotoService } from '../services/Photo.service';

export const PhotoController = {
  // 사진 업로드
  uploadPhoto: async (req: Request, res: Response, next: NextFunction) => {
    const result = PhotoService.uploadPhoto(req, res, next);
    if (result) {
      const { status, message } = result;
      res.status(status).json(message);
    }
  },
  afterUploadPhoto: async (req: Request, res: Response) => {
    res.status(201).json({
      photoURL: (req.file as Express.MulterS3.File).location,
      message: '사진 업로드 완료',
    });
  },
};
