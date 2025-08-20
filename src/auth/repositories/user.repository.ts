import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model/user.model';

export class UserRepository extends Repository<UserModel> {}
