import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post('http://localhost:4000/api/products', {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Precio"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Stock"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addProduct}>
        Agregar Producto
      </Button>
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Precio: $${product.price} - Stock: ${product.stock}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};