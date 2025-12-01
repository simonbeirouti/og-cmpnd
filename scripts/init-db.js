import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
    console.error('Error: TURSO_DATABASE_URL is not set.');
    process.exit(1);
}

console.log(`Connecting to ${url}...`);

const client = createClient({
    url,
    authToken,
});

async function main() {
    try {
        console.log('Creating tables...');

        await client.execute(`
      CREATE TABLE IF NOT EXISTS signups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

        await client.execute(`
      CREATE TABLE IF NOT EXISTS stats (
        key TEXT PRIMARY KEY,
        value INTEGER DEFAULT 0
      )
    `);

        console.log('Initializing stats...');
        await client.execute(`
      INSERT OR IGNORE INTO stats (key, value) VALUES ('signup_count', 0)
    `);

        console.log('Database initialized successfully!');
    } catch (e) {
        console.error('Error initializing database:', e);
        process.exit(1);
    }
}

main();
