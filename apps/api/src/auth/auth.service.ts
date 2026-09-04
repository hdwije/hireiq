import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import type { User } from '@hireiq/database';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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
}
