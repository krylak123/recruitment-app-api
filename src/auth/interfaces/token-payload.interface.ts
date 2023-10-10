import { Role } from '@prisma/client';

export interface TokenPayloadInterface {
  sub: string;
  role: Role;
  firstName: string;
  lastName: string;
}
