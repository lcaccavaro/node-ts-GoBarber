import { Router } from 'express';

import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../../../../../config/upload.config';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRoute = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRoute.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('file'),
  userAvatarController.update,
);

export default usersRoute;
