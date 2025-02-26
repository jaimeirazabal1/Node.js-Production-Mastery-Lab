import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api';
import { query } from './db/connection';

// Crear la aplicación Express
const app: Express = express();

// Configurar el puerto
const PORT: number = parseInt(process.env.PORT || '4000', 10);

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}));
app.use(express.json());

// Rutas
app.use('/api', apiRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('API Running');
});

// Manejador de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  // Respuesta de error
  const errorResponse = {
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
  };

  res.status(500).json(errorResponse);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 PostgreSQL: ${process.env.POSTGRES_HOST}`);
});