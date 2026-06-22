const { Client } = require('pg');

async function run() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5434,
    user: 'postgres',
    password: 'admin',
    database: 'kaizenophtha_db'
  });
  await client.connect();

  try {
    const users = await client.query('SELECT COUNT(*) FROM "users"');
    const thirds = await client.query('SELECT COUNT(*) FROM "third"');
    const portfolios = await client.query('SELECT COUNT(*) FROM "portfolios"');
    const thirdsPortfolios = await client.query('SELECT COUNT(*) FROM "thirds_portfolios"');
    const approvedThirdsPortfolios = await client.query('SELECT COUNT(*) FROM "thirds_portfolios" WHERE approved = true');
    const visits = await client.query('SELECT id, date, "thirdId" FROM "visits"');
    
    console.log('=== DATABASE RECORD COUNTS ===');
    console.log(`Users: ${users.rows[0].count}`);
    console.log(`Thirds (Paneles): ${thirds.rows[0].count}`);
    console.log(`Portfolios: ${portfolios.rows[0].count}`);
    console.log(`Thirds-Portfolios (Relations): ${thirdsPortfolios.rows[0].count}`);
    console.log(`Approved Relations: ${approvedThirdsPortfolios.rows[0].count}`);
    console.log(`Visits count: ${visits.rows.length}`);
    
    console.log('\n=== VISITS DETAIL ===');
    console.log(JSON.stringify(visits.rows, null, 2));
    
    const activePortfolios = await client.query('SELECT p.id, p.name, p."userId", u.email FROM "portfolios" p JOIN "users" u ON p."userId" = u.id');
    console.log('\n=== ACTIVE PORTFOLIOS ===');
    console.log(JSON.stringify(activePortfolios.rows, null, 2));

  } finally {
    await client.end();
  }
}

run().catch(console.error);
