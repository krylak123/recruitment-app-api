import { User } from '@prisma/client';

export type UserWithoutHashType = Exclude<User, 'hash'>;
