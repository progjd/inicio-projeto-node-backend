import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import users from '../infra/typeorm/entities/users';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  avatarfileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    ) {}

  public async execute({ user_id, avatarfileName }: IRequest): Promise<users> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only Authenticated users can change avatar');
    }
    if (user.avatar) {
      // deletar avatar
    await this.storageProvider.deleteFile(user.avatar);
    }
    const fileName = await this.storageProvider.saveFile(avatarfileName);
    user.avatar = fileName;
    await this.usersRepository.save(user);
    return user;
  }
}
export default UpdateUserAvatarService;
