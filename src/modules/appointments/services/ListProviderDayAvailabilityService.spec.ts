import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ShowProfile', () =>{
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list the list the day available from provider', async () =>{
    
   await fakeAppointmentsRepository.create({
    provider_id: 'user',
    date: new Date(2021, 0, 21, 8, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'user',
    date: new Date(2021, 0, 21, 10, 0, 0),
  });
  const availability = await listProviderDayAvailability.execute({
    provider_id: 'user',
    year: 2021,
    month: 1,
    day: 21,
  });
  expect(availability).toEqual(expect.arrayContaining([
    {hour: 8, available: false},
    {hour: 9, available: true},
    {hour: 10, available: false},
    {hour: 11, available: true},
  ]));
 
});
});