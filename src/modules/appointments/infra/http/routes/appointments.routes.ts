import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRoute = Router();
const appointmentsController = new AppointmentsController();

appointmentsRoute.use(ensureAuthenticated);

// appointmentsRoute.get('/', async (request, response) => {
//   const repository = getCustomRepository(AppointmentsRepository);
//   const appointments = await repository.find();
//   response.json(appointments);
// });

appointmentsRoute.post('/', appointmentsController.create);

export default appointmentsRoute;
