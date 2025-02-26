import { Router, Request, Response } from 'express';
import { query } from '../db/connection';

export const apiRouter = Router();

// Obtener todos los productos
apiRouter.get('/products', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Crear un nuevo producto
apiRouter.post('/products', async (req: Request, res: Response) => {
  const { name, price, stock } = req.body;
  try {
    const result = await query(
      'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *',
      [name, price, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Obtener todos los clientes
apiRouter.get('/customers', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Crear un nuevo cliente
apiRouter.post('/customers', async (req: Request, res: Response) => {
  const { name, address, phone } = req.body;
  try {
    const result = await query(
      'INSERT INTO customers (name, address, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, address, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Obtener todas las facturas
apiRouter.get('/invoices', async (req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT 
        invoices.id,
        invoices.total,
        invoices.created_at,
        customers.name AS customer_name
      FROM invoices
      INNER JOIN customers ON invoices.customer_id = customers.id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Crear una nueva factura
apiRouter.post('/invoices', async (req: Request, res: Response) => {
  const { customer_id, items } = req.body;

  if (!customer_id || !items || items.length === 0) {
    res.status(400).json({ error: 'Datos inválidos' }); // Sin return
    return;
  }

  try {
    // Calcular el total de la factura
    let total = 0;
    for (const item of items) {
      const product = await query('SELECT price FROM products WHERE id = $1', [item.product_id]);
      if (!product.rows[0]) {
        res.status(400).json({ error: `Producto con ID ${item.product_id} no encontrado` }); // Sin return
        return;
      }
      total += product.rows[0].price * item.quantity;
    }

    // Crear la factura
    const invoice = await query(
      'INSERT INTO invoices (customer_id, total) VALUES ($1, $2) RETURNING *',
      [customer_id, total]
    );

    // Agregar los ítems de la factura
    for (const item of items) {
      await query(
        'INSERT INTO invoice_items (invoice_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [invoice.rows[0].id, item.product_id, item.quantity, item.price]
      );
    }

    res.status(201).json(invoice.rows[0]); // Sin return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Sin return
  }
});