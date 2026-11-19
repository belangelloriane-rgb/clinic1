const mysql = require('mysql2/promise');

let pool;
let ready;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 4000,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test',
      // TiDB Cloud requires a secure (TLS) connection. Set DB_SSL=false only for a local MySQL.
      ssl: process.env.DB_SSL === 'false' ? undefined : { minVersion: 'TLSv1.2', rejectUnauthorized: true },
      waitForConnections: true,
      connectionLimit: 5,
      enableKeepAlive: true,
    });
    // Use Philippine time so "Seen today" matches your local date
    pool.pool.on('connection', (conn) => conn.query("SET time_zone = '+08:00'"));
  }
  return pool;
}

/** Creates the patients table once per server instance (safe to call many times). */
function initDb() {
  if (!ready) {
    ready = getPool()
      .query(`CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(120) NOT NULL,
        age INT NOT NULL,
        gender ENUM('Female','Male','Other') NOT NULL,
        phone VARCHAR(30),
        address VARCHAR(200),
        diagnosis VARCHAR(200),
        status ENUM('Active','Follow-up','Discharged') NOT NULL DEFAULT 'Active',
        visit_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_name (full_name),
        INDEX idx_status (status)
      )`)
      .catch((err) => { ready = null; throw err; });
  }
  return ready;
}

module.exports = { initDb, getPool };
