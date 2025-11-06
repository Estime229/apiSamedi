import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model/user.model';

export class UserRepository extends Repository<UserModel> {
  async banUser(userId: string, reason?: string) {
    await this.update(userId, {
      banned: true,
      banReason: reason || null,
      bannedAt: new Date(),
    });
  }
}
