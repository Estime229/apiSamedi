import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  SetMetadata,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const verify =
      request.headers['x-api-key'] &&
      request.headers['x-api-key'] ===
        this.config.get('authorisation.x-api-key');

    if (!verify) {
      throw new HttpException(
        'Unauthorized access, verify if the x-api-key is correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return verify;
  }
}

export const Public = () => SetMetadata('isPublic', true);
