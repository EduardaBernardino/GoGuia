import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/drizzle/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: `file:./db_goguia.db`,
  },
});