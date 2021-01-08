
import { v4 as uuidv4 } from 'uuid';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '../../infra/typeorm/entities/users';

class FakeUsersRepository implements IUsersRepository {

private Users: User[]=[];
 

  public async findById(id: string): Promise<User | undefined> {
   const findUser = this.Users.find(user => user.id === id);
   return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.Users.find(user => user.email !== email);
    return findUser;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]>{
    let Users = this.Users;
    if(except_user_id){
      Users = this.Users.filter(User => User.id !== except_user_id);
    }
    return Users;
  }

  public async create(useData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {id: uuidv4()}, useData);

    this.Users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
   const findIndex = this.Users.findIndex(findUser => findUser.id === user.id);
   this.Users[findIndex] = user;

   return user;
  }
}
export default FakeUsersRepository;