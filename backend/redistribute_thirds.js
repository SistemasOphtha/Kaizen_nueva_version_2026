const { Client } = require('pg');
require('dotenv').config({ path: './.env' });

const client = new Client({
  host: process.env.MYSQLDB_HOST || '/var/run/postgresql',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.MYSQLDB_USER || 'admin_ophtha',
  password: process.env.MYSQLDB_PASSWORD || 'OphthaSecure2026!',
  database: process.env.MYSQLDB_DATABASE || 'kaizen_db_nueva',
});

// Define the 14 regions and their base cities and coordinates
const regions = [
  { id: 1, name: 'Antioquia', city: 'Medellin', lat: 6.2442, lng: -75.5812 },
  { id: 2, name: 'Bogotá', city: 'Bogota', lat: 4.7110, lng: -74.0721 },
  { id: 3, name: 'Boyacá', city: 'Tunja', lat: 5.5443, lng: -73.3522 },
  { id: 4, name: 'Cartagena', city: 'Cartagena', lat: 10.3910, lng: -75.4794 },
  { id: 5, name: 'Choco', city: 'Quibdo', lat: 5.6983, lng: -76.6583 },
  { id: 6, name: 'Costa', city: 'Barranquilla', lat: 10.9685, lng: -74.7813 },
  { id: 7, name: 'Eje Cafetero', city: 'Pereira', lat: 4.8133, lng: -75.6961 },
  { id: 8, name: 'Llanos Orientales', city: 'Villavicencio', lat: 4.1420, lng: -73.6266 },
  { id: 9, name: 'Monteria', city: 'Monteria', lat: 8.8833, lng: -75.8833 },
  { id: 10, name: 'Pasto', city: 'Pasto', lat: 1.2136, lng: -77.2811 },
  { id: 11, name: 'Santander', city: 'Bucaramanga', lat: 7.1254, lng: -73.1198 },
  { id: 12, name: 'Sur', city: 'Neiva', lat: 2.9273, lng: -75.2819 },
  { id: 13, name: 'Tolima', city: 'Ibague', lat: 4.4387, lng: -75.2322 },
  { id: 14, name: 'Valle', city: 'Cali', lat: 3.4516, lng: -76.5320 }
];

async function run() {
  await client.connect();
  console.log('Connected to database to redistribute third coordinates...');
  
  try {
    // Get all thirds
    const res = await client.query('SELECT id, name FROM third ORDER BY id ASC');
    const thirds = res.rows;
    console.log(`Found ${thirds.length} thirds.`);

    for (let i = 0; i < thirds.length; i++) {
      const third = thirds[i];
      // Select region sequentially based on index to distribute evenly
      const region = regions[i % regions.length];

      // Add a small random jitter (approx. 2-5 km) so markers don't overlap exactly
      const jitterLat = (Math.random() - 0.5) * 0.05;
      const jitterLng = (Math.random() - 0.5) * 0.05;
      const finalLat = region.lat + jitterLat;
      const finalLng = region.lng + jitterLng;

      await client.query(
        'UPDATE third SET "regionId" = $1, city = $2, latitude = $3, longitude = $4 WHERE id = $5',
        [region.id, region.city, finalLat, finalLng, third.id]
      );
    }
    
    console.log('Successfully redistributed all thirds across the 14 Colombian regions!');
  } catch (err) {
    console.error('Error distributing thirds:', err);
  } finally {
    await client.end();
  }
}

run();
