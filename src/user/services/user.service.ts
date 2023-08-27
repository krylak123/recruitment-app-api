import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { User } from '@prisma/client';
import { UserWithoutHashType } from '../../auth/types';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async getAllUsers(): Promise<UserWithoutHashType[]> {
    return this.prismaService.user.findMany().then((users: User[]) =>
      users.map((user: User) => {
        delete user.hash;

        return user;
      }),
    );
  }
}
