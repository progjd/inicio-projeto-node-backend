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
    date: new Date(2021, 0, 21, 14, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'user',
    date: new Date(2021, 0, 21, 15, 0, 0),
  });

  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2021, 0, 21, 11).getTime();
   
  });

  const availability = await listProviderDayAvailability.execute({
    provider_id: 'user',
    year: 2021,
    month: 1,
    day: 21,
  });
  expect(availability).toEqual(expect.arrayContaining([
    {hour: 8, available: false},
    {hour: 9, available: false},
    {hour: 10, available: false},
    {hour: 13, available: true},
    {hour: 14, available: false},
    {hour: 15, available: false},
    {hour: 16, available: true},
  ]));
 
});
});