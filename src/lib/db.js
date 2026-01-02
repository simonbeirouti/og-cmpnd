import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function initDb() {
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

  // Initialize stats if not exists
  await client.execute(`
    INSERT OR IGNORE INTO stats (key, value) VALUES ('signup_count', 0)
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS rate_limits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip TEXT NOT NULL,
      action TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Clean up old rate limits
  await client.execute(`
    DELETE FROM rate_limits WHERE created_at < datetime('now', '-1 day')
  `);
}

export async function addSignup(name, email) {
  // We can use a transaction for atomicity
  const transaction = await client.transaction('write');
  try {
    await transaction.execute({
      sql: 'INSERT INTO signups (name, email) VALUES (?, ?)',
      args: [name, email],
    });
    await transaction.execute({
      sql: "UPDATE stats SET value = value + 1 WHERE key = 'signup_count'",
      args: [],
    });
    await transaction.commit();
  } catch (e) {
    transaction.close();
    throw e;
  }
}

export async function getSignupCount() {
  const result = await client.execute({
    sql: "SELECT value FROM stats WHERE key = 'signup_count'",
    args: [],
  });

  if (result.rows.length > 0) {
    return result.rows[0].value;
  }
  return 0;
}

export async function checkRateLimit(ip) {
  const windowMinutes = 10;
  const maxRequests = 5;
  const action = 'signup';

  // Count requests from this IP in the last window
  const result = await client.execute({
    sql: `SELECT COUNT(*) as count FROM rate_limits 
          WHERE ip = ? AND action = ? 
          AND created_at > datetime('now', '-' || ? || ' minutes')`,
    args: [ip, action, windowMinutes]
  });

  const count = result.rows[0].count;

  if (count >= maxRequests) {
    return false;
  }

  // Record this request
  await client.execute({
    sql: 'INSERT INTO rate_limits (ip, action) VALUES (?, ?)',
    args: [ip, action]
  });

  return true;
}
