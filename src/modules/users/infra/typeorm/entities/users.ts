import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import uploaConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

 @CreateDateColumn()
 created_at: Date

 @UpdateDateColumn()
 updated_at: Date

 @Expose({name: 'avatar_url'})
 getAvatarUrl(): string | null{
   if(!this.avatar){
     return null;
   }
   switch(uploaConfig.driver){
     case 'disk':
      return `${process.env.APP_API_URL}/file/${this.avatar}`;
      case 's3':
        return `https://${uploaConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
        default:
          return null;
   }
   
 }
}
export default users;
