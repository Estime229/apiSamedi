import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../../impl/update-user.command/update-user.command';
import { DataSource } from 'typeorm';
import { UserModel } from 'src/auth/models/user.model/user.model';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Update User
   * 1 - Find the user by ID
   * 2 - Update the user's properties
   * 3 - Save the changes
   */

  async execute(command: UpdateUserCommand): Promise<any> {
    const { username, password } = command;

    const existingUser = await this.dataSource
      .createQueryBuilder(UserModel, 'user')
      .select()
      .where('user.id = :id', { id: command.id })
      .getOne();

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update  User Properties
    existingUser.username = username;
    existingUser.password = hashedPassword;

    // Saves the changes
    await this.dataSource.getRepository(UserModel).save(existingUser);
    // const { password, ...safeUser } = user;

    const safeUser = (({ password, ...user }) => user)(existingUser);
    return {
      data: safeUser,
      message: 'User updated successfully',
    };
  }
}
