import path from 'path';
import { defineConfig } from 'prisma/config';

// Prisma v7 configuration file
export default defineConfig({
  schema: path.join(__dirname, 'prisma/schema.prisma'),
});
