import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '@prisma/services';
import * as argon from 'argon2';

import { AuthSignInDto, AuthSignUpDto } from '../dto';
import { AccessTokenInterface } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async signUp(dto: AuthSignUpDto): Promise<AccessTokenInterface> {
    const { email, firstName, lastName } = dto;

    const hash: string = await argon.hash(dto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email,
          hash,
          firstName,
          lastName,
        },
      });

      return this.signToken(user.id, user.email, user.firstName, user.lastName);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  public async signIn(dto: AuthSignInDto): Promise<AccessTokenInterface> {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.hash, password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email, user.firstName, user.lastName);
  }

  private async signToken(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<AccessTokenInterface> {
    const payload = {
      id,
      email,
      firstName,
      lastName,
    };

    const access_token: string = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return { access_token };
  }
}
