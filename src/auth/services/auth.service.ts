import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { AuthSignInDto, AuthSignUpDto } from '../dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  public async signUp(dto: AuthSignUpDto): Promise<any> {
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

      delete user.hash;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  public async signIn(dto: AuthSignInDto): Promise<any> {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.hash, password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    delete user.hash;
    return user;
  }
}
