import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, type User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaClient;

  @Inject()
  private readonly jwtService: JwtService;

  async signin(
    params: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: params.email },
    });

    if (!user) throw new NotFoundException('User not found');

    const passwordMatch = await bcrypt.compare(params.password, user.password);

    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id };

    return { access_token: await this.jwtService.sign(payload) };
  }
}
