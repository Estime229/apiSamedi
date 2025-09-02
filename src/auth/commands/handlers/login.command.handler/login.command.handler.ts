import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../../impl/login.command/login.command';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserModel } from '../../../models/user.model/user.model'; // chemin correct si la structure est src/auth/commands/handlers/login.command.handler/login.command.handler.ts

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  private readonly logger = new Logger(LoginCommandHandler.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: LoginCommand): Promise<any> {
    try {
      // Vérification des arguments
      if (!command.email || !command.password) {
        throw new UnauthorizedException('Email and password are required');
      }

      // Récupération de l'utilisateur AVEC le mot de passe
      const existingUser = await this.dataSource
        .getRepository(UserModel)
        .createQueryBuilder('user')
        .addSelect('user.password') // Nécessaire pour récupérer le hash
        .where('user.email = :email', { email: command.email })
        .getOne();

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      // Vérification que le hash existe
      if (!existingUser.password) {
        this.logger.error(`User ${command.email} has no password set`);
        throw new UnauthorizedException('Invalid credentials');
      }

      // Comparaison des mots de passe
      const isPasswordValid = await bcrypt.compare(
        command.password,
        existingUser.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Génération du token JWT
      const payload = {
        sub: existingUser.id,
        email: existingUser.email,
      };

      const token = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('jwt.expireIn') || '2h',
        secret: this.configService.get<string>('jwt.secret'),
      });

      // Ne retournez jamais le mot de passe
      const { password, ...userWithoutPassword } = existingUser;

      return {
        token,
        user: userWithoutPassword,
      };
    } catch (error) {
      this.logger.error(
        `Authentication error for ${command.email}`,
        error.stack,
      );
      throw error;
    }
  }
}
