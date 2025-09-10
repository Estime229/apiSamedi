import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../../impl/update-user.command/update-user.command';
import { DataSource } from 'typeorm';
import { UserModel } from '../../../../auth/models/user.model/user.model';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@CommandHandler(UpdateUserCommand)
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
    const { username, password, userUrl } = command;

    const existingUser = await this.dataSource
      .createQueryBuilder(UserModel, 'user')
      .select()
      .where('user.id = :id', { id: command.id })
      .getOne();

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Mise à jour conditionnelle des propriétés
    if (username !== undefined) {
      existingUser.username = username;
    }
    if (password !== undefined && password !== null && password !== '') {
      const salt = await bcrypt.genSalt();
      existingUser.password = await bcrypt.hash(password, salt);
    }
    if (userUrl !== undefined) {
      existingUser.userUrl = userUrl;
    }

    // Sauvegarde des modifications
    await this.dataSource.getRepository(UserModel).save(existingUser);
    // Retirer le champ password de la réponse
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _removed, ...safeUser } = existingUser;
    return {
      data: safeUser,
      message: 'User updated successfully',
    };
  }
}
