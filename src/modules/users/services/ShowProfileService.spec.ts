import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';


let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () =>{
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () =>{
    
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
   const profile = await showProfile.execute({
    user_id: user.id,
    
    });
    expect(profile.name).toBe('john doe');
    expect(profile.email).toBe('johndoe@example.com');
   });

   it('should be able show the profile from non-existing user', async () =>{
   
    expect(showProfile.execute({
      user_id: 'non-existing user',
      
      }),
      ).rejects.toBeInstanceOf(AppError);
   
   });
});