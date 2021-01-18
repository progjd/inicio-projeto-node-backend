import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import users from '../infra/typeorm/entities/users';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest{
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<users> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);
    if (checkUsersExists) {
      throw new AppError('email adress already used');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');
    return user;
  }
}
export default CreateUserService;
