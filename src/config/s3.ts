import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
dotenv.config();

const s3Config: S3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export const storage = multerS3({
  s3: s3Config,
  bucket: process.env.BUCKET_NAME,
  key(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
