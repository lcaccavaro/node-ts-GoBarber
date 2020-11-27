import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm';

const appointmentsRoute = Router();


appointmentsRoute.get('/', async (request, response) => {
  const repository = getCustomRepository(AppointmentsRepository);
  const appointments = await repository.find();
  response.json(appointments)
});

appointmentsRoute.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({ provider, date: parsedDate });
    return response.json(appointment);

  } catch (error) {
    return response.status(400).json({
      messase: error.message
    })
  }

})

export default appointmentsRoute;

