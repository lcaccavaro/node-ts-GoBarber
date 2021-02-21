import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    // eslint-disable-next-line camelcase
    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}
