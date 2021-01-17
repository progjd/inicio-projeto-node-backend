import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ShowProfile', () =>{
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentsRepository, fakeCacheProvider);
  });

  it('should be able to list the list appointments on a specific day', async () =>{
    
   const appointment1 = await fakeAppointmentsRepository.create({
    provider_id: 'provider',
    user_id: 'user1',

    date: new Date(2021, 0, 21, 14, 0, 0),

  });

  const appointment2 = await fakeAppointmentsRepository.create({
    provider_id: 'provider',
    user_id: 'user1',
    date: new Date(2021, 0, 21, 15, 0, 0),
  });

  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2021, 0, 21, 11).getTime();
   
  });



  const appointments = await listProviderAppointments.execute({
    provider_id: 'provider',
    year: 2021,
    month: 1,
    day: 21,
  });
  expect(appointments).toEqual([
    appointment1,
    appointment2,
  ]);
 
});
});