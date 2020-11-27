import { v4 as uuid } from "uuid";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('appointments')
class Appointment {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('string')
  provider: string;

  @Column('time with time zone')
  date: Date;

  /**
   * Using TypeORM, it's not necessary constructor anymore, 
   * because the notations are responsibles for this creation automatically.
  */
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;