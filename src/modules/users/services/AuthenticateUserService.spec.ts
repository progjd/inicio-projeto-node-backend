import 'reflect-metadata';
import AuthenticateUserService from './AuthenticateUserSevice';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () =>{
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
     fakeHashProvider = new FakeHashProvider();
    
     authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate', async () =>{
     
    const user = await fakeUsersRepository.create({
    name: 'john doe',
    email: 'johntre@exemplo.com',
    password: '123456',
    });

    const response = await authenticateUser.execute({
    email: 'johndoe@exemplo.com',
    password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
 
  });

  it('should be able to authenticate with no existing user', async () =>{
    
  await  expect(authenticateUser.execute({
      email: 'johndoe@exemplo.com',
      password: '123456',
      }),
      ).rejects.toBeInstanceOf(AppError);
     });

     it('should not be able to authenticate with wrong password', async () =>{
        
     await fakeUsersRepository.create({
        name: 'john doe',
        email: 'johntre@exemplo.com',
        password: '123456',
        });
      await  expect(authenticateUser.execute({
        email: 'johndoe@exemplo.com',
        password: 'wrong-password',
        }),
        ).rejects.toBeInstanceOf(AppError);
     });
});