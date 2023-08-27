import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../../prisma/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  public async validate(payload: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<{
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    delete user.hash;

    return user;
  }
}
