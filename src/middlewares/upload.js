import multer from '@koa/multer';
import crypto from 'node:crypto';
import { TEMP_DIR } from '../config/storage.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename(req, file, cb) {
    const uniqueName = crypto.randomUUID();
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5 MB max
    files: 5,
    fields: 20,
    parts: 25,
    fieldsSize: 100 * 1024
  },
  fileFilter(req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error('Not allowed mimetype');
      error.code = 'INVALID_FILE_TYPE';
      error.status = 415;
      cb(error, false);
    }
  }
});

const singleUploadMiddleware = upload.single('photo');

export default upload;