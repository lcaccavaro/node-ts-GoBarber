import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRoute = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRoute.use(ensureAuthenticated);

// appointmentsRoute.get('/', async (request, response) => {
//   const repository = getCustomRepository(AppointmentsRepository);
//   const appointments = await repository.find();
//   response.json(appointments);
// });

appointmentsRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRoute.get('/me', providerAppointmentsController.index);

export default appointmentsRoute;
