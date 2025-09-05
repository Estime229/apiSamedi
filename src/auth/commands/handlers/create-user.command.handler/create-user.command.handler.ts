import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../impl/create-user.command/create-user.command';
import { DataSource } from 'typeorm';
import { UserModel } from '../../../models/user.model/user.model'; // chemin correct si la structure est src/auth/commands/handlers/create-user.command.handler/create-user.command.handler.ts
import { ConflictException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  private readonly logger = new Logger(CreateUserCommandHandler.name);

  constructor(private readonly dataSource: DataSource) {}
  async execute(command: CreateUserCommand): Promise<any> {
    try {
      // Vérification de l'existence de l'utilisateur
      const existingUser = await this.dataSource
        .getRepository(UserModel)
        .createQueryBuilder('user')
        .where('user.email = :email', { email: command.email })
        .getOne();

      if (existingUser) {
        throw new ConflictException(
          'Un utilisateur avec cet email existe déjà',
        );
      }

      // Hashage du mot de passe
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(command.password, salt);

      // Création de l'utilisateur
      const user = new UserModel();
      user.username = command.username;
      user.email = command.email;
      user.password = hashedPassword;
      user.userUrl = command.userUrl;

      // Sauvegarde de l'utilisateur
      const savedUser = await this.dataSource
        .getRepository(UserModel)
        .save(user);

      this.logger.log(`Utilisateur créé avec succès: ${savedUser.id}`);

      return {
        id: savedUser.id,
        email: savedUser.email,
      };
    } catch (error) {
      this.logger.error(
        `Erreur lors de la création de l'utilisateur`,
        error.stack,
      );
      throw error;
    }
  }
}
