import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRoute = Router();

usersRoute.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();
    const newUser = await createUserService.execute({
      name,
      email,
      password
    });

    return response.json(newUser);

  } catch (error) {
    return response.status(400).json({
      messase: error.message
    })
  }

})

export default usersRoute;

