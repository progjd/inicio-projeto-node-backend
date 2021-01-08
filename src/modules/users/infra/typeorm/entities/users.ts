import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
class users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

 @CreateDateColumn()
 created_at: Date

 @UpdateDateColumn()
 updated_at: Date
}
export default users;
