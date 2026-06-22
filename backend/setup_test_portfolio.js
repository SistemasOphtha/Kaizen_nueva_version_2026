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
    // 1. Check if portfolio for user 22 exists
    const resPortfolio = await client.query('SELECT id FROM "portfolios" WHERE "userId" = 22');
    let portfolioId;
    if (resPortfolio.rows.length === 0) {
      console.log('Creating portfolio for user 22 (Hector Alvarez)...');
      const insertPortfolio = await client.query(
        'INSERT INTO "portfolios" (name, "userId", status, "createdAt", "updatedAt") VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id',
        ['Portafolio de Hector Alvarez', 22, 'active']
      );
      portfolioId = insertPortfolio.rows[0].id;
      console.log(`Portfolio created with ID: ${portfolioId}`);
    } else {
      portfolioId = resPortfolio.rows[0].id;
      console.log(`Portfolio already exists with ID: ${portfolioId}`);
    }

    // 2. Check if third 179 is associated with the portfolio
    const resThirdPortfolio = await client.query(
      'SELECT id FROM "thirds_portfolios" WHERE "portfolioId" = $1 AND "thirdId" = $2',
      [portfolioId, 179]
    );

    if (resThirdPortfolio.rows.length === 0) {
      console.log(`Associating third 179 with portfolio ${portfolioId}...`);
      await client.query(
        'INSERT INTO "thirds_portfolios" ("portfolioId", "thirdId", approved, status, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())',
        [portfolioId, 179, true, 'active']
      );
      console.log('Association created successfully.');
    } else {
      console.log('Association already exists. Ensuring it is approved and active...');
      await client.query(
        'UPDATE "thirds_portfolios" SET approved = true, status = \'active\', "updatedAt" = NOW() WHERE "portfolioId" = $1 AND "thirdId" = $2',
        [portfolioId, 179]
      );
      console.log('Association updated successfully.');
    }

    // 3. Print the results
    const finalPortfolio = await client.query('SELECT * FROM "portfolios" WHERE "userId" = 22');
    console.log('\n=== FINAL PORTFOLIO ===');
    console.log(finalPortfolio.rows);

    const finalAssociation = await client.query('SELECT * FROM "thirds_portfolios" WHERE "portfolioId" = $1 AND "thirdId" = $2', [portfolioId, 179]);
    console.log('\n=== FINAL ASSOCIATION ===');
    console.log(finalAssociation.rows);

  } finally {
    await client.end();
  }
}

run().catch(console.error);
