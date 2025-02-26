import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Bodegas
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Productos
        </Button>
        <Button color="inherit" component={Link} to="/customers">
          Clientes
        </Button>
        <Button color="inherit" component={Link} to="/invoices">
          Facturas
        </Button>
      </Toolbar>
    </AppBar>
  );
};