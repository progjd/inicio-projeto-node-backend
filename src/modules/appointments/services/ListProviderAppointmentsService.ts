import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import { classToClass } from 'class-transformer';





interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
 }
 
@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
   ) {}

  public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {
    let appointments =  await this.cacheProvider.recover<Appointment[]>(`provider-appointments:${provider_id}:${year}-${month}-${day}`);

    if(!appointments){
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
        provider_id,
        day,
        month,
        year,
      },
      );
     
      // console.log('buscou do banco');
       await this.cacheProvider.save(`provider-appointments:${provider_id}:${year}-${month}-${day}`, classToClass(appointments));
    }

   return appointments;
  }
 }
export default ListProviderAppointmentsService;