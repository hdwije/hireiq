import { Injectable } from '@nestjs/common';
import { prisma } from '@hireiq/database';
import type { PrismaClient } from '@hireiq/database';

@Injectable()
export class PrismaService {
  db: PrismaClient = prisma;
}
