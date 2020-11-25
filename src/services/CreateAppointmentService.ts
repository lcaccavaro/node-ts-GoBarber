import { startOfHour } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
  provider: string,
  date: Date
}

class CreateAppointmentService {
  private repository: AppointmentsRepository;

  constructor(repository: AppointmentsRepository) {
    this.repository = repository;
  }

  public execute({ provider, date }: Request) {
    const appointmentDate = startOfHour(date);

    const dateBooked = this.repository.findByDate(appointmentDate);

    if (dateBooked) {
      throw Error('Date and time is already booked');
    }

    const appointment = this.repository.create({
      provider,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService