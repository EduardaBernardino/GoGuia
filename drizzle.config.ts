import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/drizzle/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: `file:./${process.env.DB_FILE_NAME}.db`,
  },
});