import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public get(): Appointment[] {
    return this.appointments;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);
    this.appointments.push(appointment);
    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const dateBooked = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return dateBooked || null;
  }
}

export default AppointmentsRepository;