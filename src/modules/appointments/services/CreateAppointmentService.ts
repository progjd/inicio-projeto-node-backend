import { startOfHour, isBefore, getHours, format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest{
  provider_id: string;
  user_id: string;
  date: Date;
}

// dependencia inversion
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ provider_id, date, user_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if(isBefore(appointmentDate, Date.now())){
      throw new AppError("You can't create a appointments on a past date.")
    }

    if(user_id === provider_id){
      throw new AppError("You can´t create a appointment with yourself.");
    }
    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
      throw new AppError('Your can only create appointment between 8am and 5pm');
    }

    const findAppointmentIsSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
      );

    if (findAppointmentIsSameDate) {
      throw new AppError('this appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormated = format(appointmentDate, "dd/MM/yyy 'às' HH:mm'h'");
   await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormated}`,
    });

    console.log( `provider-appointments:${provider_id}:${ format(
      appointmentDate,
       'yyyy-M-d',
  )}`,);

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${ format(
        appointmentDate,
         'yyyy-M-d',
    )}`,
    );
    return appointment;
  }
}

export default CreateAppointmentService;
