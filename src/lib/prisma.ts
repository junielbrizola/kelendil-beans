// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Avoid multiple instances of Prisma Client in development
// Enable query logging in development to catch slow queries
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error']
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;