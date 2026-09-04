import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import type { User } from '@hireiq/database';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup({
    email,
    name,
    password,
    tenantName,
  }: SignupDto): Promise<Omit<User, 'password'>> {
    let tenant = await this.prisma.db.tenant.findFirst({
      where: { name: tenantName },
    });

    if (!tenant) {
      tenant = await this.prisma.db.tenant.create({
        data: { name: tenantName },
      });
    }

    const { password: _, ...user } = await this.prisma.db.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
        tenantId: tenant.id,
      },
    });

    return user;
  }

  async signin({
    email,
    password,
  }: SigninDto): Promise<Record<string, string>> {
    const user = await this.prisma.db.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const payload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
    };

    return { token: this.jwtService.sign(payload) };
  }
}
