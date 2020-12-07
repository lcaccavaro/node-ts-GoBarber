import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload.config';
import User from '../models/User';

interface Request {
  userId: string,
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new Error('Only authenticated users can update avatar');
    }

    if (user.avatar) {
      const avatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const avatarFileExists = await fs.promises.stat(avatarFilePath);

      if (avatarFileExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    //alterar pelo filename novo
    user.avatar = avatarFilename;
    await userRepository.save(user);

    return user;

  }
}

export default UpdateUserAvatarService;