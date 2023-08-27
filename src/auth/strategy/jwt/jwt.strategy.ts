import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../../prisma/services';
import { TokenPayloadInterface } from '../../interfaces';
import { UserWithoutHashType } from '../../types';

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

  public async validate(
    payload: TokenPayloadInterface,
  ): Promise<UserWithoutHashType> {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    delete user.hash;

    return user as UserWithoutHashType;
  }
}
