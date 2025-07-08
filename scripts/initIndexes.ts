// scripts/initIndexes.ts
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const MAX_RETRIES = 5;
const INITIAL_BACKOFF = 1000; // 1 second

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function initIndexes() {
  const prisma = new PrismaClient();
  try {
    // Read schema.prisma to extract model names
    const schemaPath = path.resolve(__dirname, '../prisma/schema.prisma');
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    const modelNames = Array.from(
      schemaContent.matchAll(/model\s+(\w+)\s+\{/g)
    ).map(m => m[1]);

    // TTL expiration: 90 days in seconds
    const expireAfterSeconds = 90 * 24 * 60 * 60; // 7776000 seconds

    for (const modelName of modelNames) {
      const collectionName = modelName;
      const indexName = `${modelName}DeletedTTL`;
      console.log(`Creating TTL index for collection: ${collectionName}`);
      await prisma.$runCommandRaw({
        createIndexes: collectionName,
        indexes: [
          { key: { deletedAt: 1 }, name: indexName, expireAfterSeconds }
        ]
      });
    }

    console.log('✅ TTL indexes initialized successfully for all models.');
  } finally {
    await prisma.$disconnect();
  }
}

(async () => {
  let attempt = 0;
  let backoff = INITIAL_BACKOFF;
  while (attempt < MAX_RETRIES) {
    try {
      await initIndexes();
      break;
    } catch (error) {
      attempt++;
      console.error(`❌ initIndexes attempt ${attempt} failed:`, error);
      if (attempt >= MAX_RETRIES) {
        console.error('Exceeded maximum retry attempts.');
        process.exit(1);
      }
      console.log(`Retrying in ${backoff}ms...`);
      await delay(backoff);
      backoff *= 2;
    }
  }
})();


// await prisma.$runCommandRaw({
//   createIndexes: 'PasswordResetToken',
//   indexes: [{ key: { expiresAt: 1 }, name: 'PasswordResetTokenTTL', expireAfterSeconds: 0 }]
// });