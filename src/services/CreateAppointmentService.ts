import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
  provider_id: string,
  date: Date
}

class CreateAppointmentService {

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const dateBooked = await repository.findByDate(appointmentDate);

    if (dateBooked) {
      throw Error('Date and time is already booked');
    }

    const appointment = repository.create({
      provider_id,
      date: appointmentDate
    });

    await repository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService