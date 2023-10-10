import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client';

import { UserWithoutHashType } from '../../auth/types';
import { PrismaService } from '../../prisma/services';
import { ListResponseInterface } from '../../shared/models';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async getAllCandidates(): Promise<
    ListResponseInterface<UserWithoutHashType>
  > {
    const quantity: number = await this.prismaService.user.count({
      where: {
        role: Role.USER,
      },
    });
    const data: UserWithoutHashType[] = await this.prismaService.user
      .findMany({
        where: {
          role: Role.USER,
        },
      })
      .then((users: User[]) =>
        users.map((user: User) => {
          delete user.hash;

          return user as UserWithoutHashType;
        }),
      );

    return {
      quantity,
      data,
    };
  }

  public async getAllEmployees(): Promise<
    ListResponseInterface<UserWithoutHashType>
  > {
    const quantity: number = await this.prismaService.user.count({
      where: {
        role: {
          not: Role.USER,
        },
      },
    });
    const data: UserWithoutHashType[] = await this.prismaService.user
      .findMany({
        where: {
          role: {
            not: Role.USER,
          },
        },
      })
      .then((users: User[]) =>
        users.map((user: User) => {
          delete user.hash;

          return user as UserWithoutHashType;
        }),
      );

    return {
      quantity,
      data,
    };
  }

  public async getUserById(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserWithoutHashType> {
    const user: User = await this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!user) throw new NotFoundException("user doesn't exists");

    delete user.hash;

    return user as UserWithoutHashType;
  }
}
