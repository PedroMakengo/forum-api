import { User as Users } from '@prisma/client';

export class User implements Users {
  id: string;
  name: string | null;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
