import { Router, Request, Response } from 'express';
import { query } from '../db/connection';

export const apiRouter: Router = Router();

// Obtener productos con paginación
apiRouter.get('/products', async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const offset: number = (page - 1) * limit;

    const result = await query(
    'SELECT id, name, price::numeric FROM products ORDER BY id LIMIT $1 OFFSET $2',
    [limit, offset]
    );

    const response = {
      data: result.rows,
      pagination: {
        page,
        limit,
        total: result.rowCount,
      },
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Health check endpoint
apiRouter.get('/health', (req: Request, res: Response) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  };

  res.json(healthCheck);
});