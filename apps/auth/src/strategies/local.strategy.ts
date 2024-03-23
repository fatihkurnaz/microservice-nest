import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    try {
      // aşağıdaki döneni request'e eklememizi sağlayar
      return this.usersService.verifyUser(email, password);
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
