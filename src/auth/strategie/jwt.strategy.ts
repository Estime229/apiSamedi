import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
  ) {
    const keySecret = configService.get<string>('jwt.secret'); // Notez le <string> pour le typage
    console.log(keySecret);
    if (!keySecret) {
      throw new Error('SECRET_KEY is not configured');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: keySecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }): Promise<Omit<UserModel, 'password'>> {
    // console.log('Payload JWT reçu:', payload);
    const user = await this.userRepository.findOne({
      where: { email: payload.email },
      select: ['id', 'email', 'username', 'created_at'],
    });
    // console.log('Utilisateur trouvé:', user);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
