import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRoute = Router();
const repository = new AppointmentsRepository();

appointmentsRoute.get('/', (request, response) => {
  const appointments = repository.get();
  response.json(appointments)
});

appointmentsRoute.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const dateBooked = repository.findByDate(parsedDate);

  if (dateBooked) {
    return response
      .status(400)
      .json({ message: "Date and time is already booked" });
  }

  const appointment = repository.create(provider, parsedDate);

  return response.json(appointment);
})

export default appointmentsRoute;

