import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';

import { PrismaService } from '../../prisma/services';
import { AuthSignInDto, AuthSignUpDto } from '../dto';
import { AccessTokenInterface, TokenPayloadInterface } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async signUp(
    dto: AuthSignUpDto,
    registerAsEmployee: boolean,
  ): Promise<AccessTokenInterface> {
    const { firstName, lastName, email, password, phone } = dto.commonGroup;

    const hash: string = await argon.hash(password);

    try {
      const user: User = await this.prismaService.user.create({
        data: {
          email,
          hash,
          firstName,
          lastName,
          phone,
          role: registerAsEmployee ? Role.EMPLOYEE : Role.USER,
        },
      });

      return this.signToken(user);
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

    const user: User = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches: boolean = await argon.verify(user.hash, password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user);
  }

  private async signToken(user: User): Promise<AccessTokenInterface> {
    const { id, firstName, lastName, role } = user;

    const payload: TokenPayloadInterface = {
      sub: id,
      firstName,
      lastName,
      role,
    };

    const access_token: string = await this.jwtService.signAsync(payload, {
      expiresIn: '12h',
      secret: this.configService.get('JWT_SECRET'),
    });

    return { access_token };
  }
}
