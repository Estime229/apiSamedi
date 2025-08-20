import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../../impl/delete-user.command/delete-user.command';
import { DataSource } from 'typeorm';
import { UserModel } from 'src/auth/models/user.model/user.model';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: DeleteUserCommand): Promise<any> {
    const user = await this.dataSource
      .getRepository(UserModel)
      .findOneBy({ id: command.id });
    if (!user) {
      throw new Error('User not found');
    }

    await this.dataSource.getRepository(UserModel).remove(user);
    return { success: true };
  }
}
