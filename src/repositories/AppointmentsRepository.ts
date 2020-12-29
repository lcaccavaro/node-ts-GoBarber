import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

  public async findByDate(date: Date): Promise<Appointment | null> {
    const dateBooked = await this.findOne({
      where: { date }
    });
    return dateBooked || null;
  }
}

export default AppointmentsRepository;