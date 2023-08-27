import { UserWithoutHashType } from '@auth/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@prisma/services';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async getAllUsers(): Promise<UserWithoutHashType[]> {
    return this.prismaService.user.findMany().then((users: User[]) =>
      users.map((user: User) => {
        delete user.hash;

        return user as UserWithoutHashType;
      }),
    );
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
