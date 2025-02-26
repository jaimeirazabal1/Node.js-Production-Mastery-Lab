import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/products">Productos</Link>
        </li>
        <li>
          <Link to="/customers">Clientes</Link>
        </li>
        <li>
          <Link to="/invoices">Facturas</Link>
        </li>
      </ul>
    </nav>
  );
};