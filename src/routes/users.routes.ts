import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload.config';

const usersRoute = Router();

const upload = multer(uploadConfig);

usersRoute.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();
    const newUser = await createUserService.execute({
      name,
      email,
      password
    });

    delete newUser.password;

    return response.json(newUser);

  } catch (error) {
    return response.status(400).json({
      messase: error.message
    })
  }
});

usersRoute.patch('/avatar',
  ensureAuthenticated,
  upload.single('file'),
  async (request, response) => {
    return response.json({ file: request.file });
  });



export default usersRoute;

