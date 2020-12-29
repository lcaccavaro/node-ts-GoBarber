import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRoute = Router();

appointmentsRoute.use(ensureAuthenticated);

appointmentsRoute.get('/', async (request, response) => {
  const repository = getCustomRepository(AppointmentsRepository);
  const appointments = await repository.find();
  response.json(appointments)
});

appointmentsRoute.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({ provider_id, date: parsedDate });
    return response.json(appointment);

  } catch (error) {
    return response.status(400).json({
      messase: error.message
    })
  }

})

export default appointmentsRoute;

