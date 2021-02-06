import { getRepository, Repository } from 'typeorm';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const dateBooked = await this.ormRepository.findOne({
      where: { date },
    });
    return dateBooked;
  }

  public async create({
    // eslint-disable-next-line camelcase
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
