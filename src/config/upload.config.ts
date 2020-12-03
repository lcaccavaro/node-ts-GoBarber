import { diskStorage } from 'multer';
import crypto from 'crypto';
import path from 'path';

export default {
  storage: diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    }
  })
}