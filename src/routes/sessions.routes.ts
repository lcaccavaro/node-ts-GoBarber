import { Router } from 'express';
import AuthenticateService from '../services/AuthenticateService';

const sessionsRoute = Router();

sessionsRoute.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateService = new AuthenticateService();
    const { user } = await authenticateService.execute({
      email,
      password
    });

    delete user.password;

    return response.json(user);

  } catch (error) {
    return response.status(400).json({
      messase: error.message
    })
  }

})

export default sessionsRoute;

