import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRoute = Router();
const repository = new AppointmentsRepository();

appointmentsRoute.get('/', (request, response) => {
  const appointments = repository.get();
  response.json(appointments)
});

appointmentsRoute.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(repository);
    const appointment = createAppointmentService.execute({ provider, date: parsedDate });
    return response.json(appointment);

  } catch (error) {
    return response.status(400).json({
      messase: error.message
    })
  }

})

export default appointmentsRoute;

