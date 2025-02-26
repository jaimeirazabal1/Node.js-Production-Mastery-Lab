import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
});

// Función para verificar la conexión a PostgreSQL
const checkConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to PostgreSQL');
  } catch (err) {
    console.error('❌ Error connecting to PostgreSQL:', err);
    // Reintentar después de 5 segundos
    setTimeout(checkConnection, 5000);
  }
};

// Verificar la conexión al iniciar
checkConnection();

export const query = (text: string, params?: any[]) => pool.query(text, params);