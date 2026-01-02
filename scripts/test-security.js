import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables immediately
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function runSecurityTests() {
    console.log('🔒 Starting Security Tests for MDW Proposal...');

    // Dynamic import to ensure env vars are loaded before db.js is imported
    // This allows db.js to read process.env.TURSO_DATABASE_URL correctly
    const { addSignup } = await import('../src/lib/db.js');

    const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const testId = `TEST_${Date.now()}`;
    const injectionAttempt = `ValidName'); DROP TABLE signups; --`;
    const safeEmail = `test_${testId}@example.com`;

    console.log(`\n1️⃣ Testing SQL Injection Resilience...`);
    console.log(`   Attempting to insert name: "${injectionAttempt}"`);

    try {
        // 1. Attempt the "attack"
        await addSignup(injectionAttempt, safeEmail);
        console.log('   ✅ addSignup executed without error (Good start - no syntax error in query).');

        // 2. Verify what was actually stored
        const result = await client.execute({
            sql: 'SELECT * FROM signups WHERE email = ?',
            args: [safeEmail]
        });

        if (result.rows.length === 0) {
            console.error('   ❌ ERROR: Could not find the inserted record.');
            return;
        }

        const storedName = result.rows[0].name;
        console.log(`   stored name: "${storedName}"`);

        if (storedName === injectionAttempt) {
            console.log('   ✅ PASSED: Query parameters were escaped correctly. The SQL injection payload was stored as a literal string.');
        } else {
            console.error('   ❌ FAILED: stored name does not match input. Something modified it?');
        }

        // 3. Verify table still exists (redundant if storedName match, but good for sanity)
        const tableCheck = await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='signups'");
        if (tableCheck.rows.length > 0) {
            console.log('   ✅ PASSED: "signups" table still exists.');
        } else {
            console.error('   ❌ FAILED: "signups" table is GONE! SQL Injection successful!');
        }

    } catch (error) {
        console.error('   ❌ Unexpected error during test:', error);
    }

    console.log(`\n2️⃣ Testing Rate Limiting Logic...`);
    const rateLimitIp = `192.168.1.${Math.floor(Math.random() * 255)}`;
    console.log(`   Simulating requests from IP: ${rateLimitIp}`);

    try {
        const { checkRateLimit } = await import('../src/lib/db.js');

        // We allow 5 requests. Use loop.
        for (let i = 1; i <= 5; i++) {
            const allowed = await checkRateLimit(rateLimitIp);
            if (allowed) {
                console.log(`   Attempt ${i}: Allowed ✅`);
            } else {
                console.error(`   Attempt ${i}: Blocked ❌ (Should be allowed)`);
            }
        }

        // 6th request should be blocked
        const blocked = await checkRateLimit(rateLimitIp);
        if (!blocked) {
            console.log(`   Attempt 6: Blocked ✅ (Limit enforced correctly)`);
        } else {
            console.error(`   Attempt 6: Allowed ❌ (Should be blocked!)`);
        }

    } catch (error) {
        console.error('   ❌ Rate limit test failed:', error);
    } finally {
        // Cleanup
        console.log(`\n🧹 Cleaning up test data...`);
        try {
            await client.execute({
                sql: 'DELETE FROM signups WHERE email = ?',
                args: [safeEmail]
            });
            await client.execute({
                sql: 'DELETE FROM rate_limits WHERE ip = ?',
                args: [rateLimitIp]
            });
            console.log('   ✅ Cleanup complete.');
        } catch (e) {
            console.error('   ⚠️ Failed to clean up:', e);
        }
    }
}

// Execute safely
runSecurityTests().catch(err => {
    console.error('Fatal Error:', err);
    process.exit(1);
});
