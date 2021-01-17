import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,

} from 'typeorm';
import users from '@modules/users/infra/typeorm/entities/users';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => users)
  @JoinColumn({ name: 'provider_id' })
  provider: users;

  @Column()
  user_id: string;

  @ManyToOne(() => users)
  @JoinColumn({ name: 'user_id' })
  User: users;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
export default Appointment;
