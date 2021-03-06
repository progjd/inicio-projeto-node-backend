import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/users/infra/typeorm/entities/users';
import { classToClass } from 'class-transformer';


interface IRequest {
  user_id: string;
 }

@injectable()
class ListProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
 let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`);

    if(!users){
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });
      // console.log('A queri no banco foi feita!');
    await this.cacheProvider.save(`providers-list:${user_id}`, classToClass(users));
    }
    return users;
  }
}
export default ListProfileService;