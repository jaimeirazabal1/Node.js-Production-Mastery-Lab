import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './Products';

// Definir tipos de datos
interface Customer {
  id: number;
  name: string;
  address: string;
  phone: string;
}

interface Invoice {
  id: number;
  customer_id: number;
  total: number;
}



export const Invoices: React.FC = () => {
  // Estados con tipos definidos
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | ''>('');
  const [selectedProducts, setSelectedProducts] = useState<
    Array<Product & { quantity: number }>
  >([]);

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
    fetchProducts();
  }, []);

  // Obtener facturas
  const fetchInvoices = async () => {
    try {
      const response = await axios.get<Invoice[]>('http://localhost:4000/api/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener clientes
  const fetchCustomers = async () => {
    try {
      const response = await axios.get<Customer[]>('http://localhost:4000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Obtener productos
const fetchProducts = async () => {
  try {
    const response = await axios.get<Product[]>('http://localhost:4000/api/products');
    setProducts(response.data);

    // Inicializar selectedProducts con cada producto y cantidad 0
    setSelectedProducts(
      response.data.map((product) => ({
        ...product,
        quantity: 0,
      }))
    );
  } catch (error) {
    console.error(error);
  }
};

  // Crear una factura
// Crear una factura
const createInvoice = async () => {
  if (!selectedCustomer) {
    alert('Selecciona un cliente');
    return;
  }

  // Filtrar productos con cantidad mayor a 0
    const items = selectedProducts
        .filter((product) => product.quantity > 0)
        .map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
        price: product.price,
        }));

    if (items.length === 0) {
        alert('Selecciona al menos un producto con cantidad mayor a 0');
        return;
    }

    try {
        await axios.post('http://localhost:4000/api/invoices', {
        customer_id: selectedCustomer,
        items,
        });
        fetchInvoices(); // Actualizar la lista de facturas
    } catch (error) {
        console.error(error);
    }
    };

  // Manejar cambios en la cantidad de productos seleccionados
    const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts((prev) =>
        prev.map((p) =>
        p.id === productId ? { ...p, quantity } : p
        )
    );
    };

  return (
    <div>
      <h2>Facturas</h2>
      <div>
        {/* Seleccionar cliente */}
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(Number(e.target.value))}
        >
          <option value="">Seleccionar cliente</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        {/* Lista de productos */}
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <input
                type="number"
                placeholder="Cantidad"
                onChange={(e) =>
                  handleQuantityChange(product.id, parseInt(e.target.value))
                }
              />
            </li>
          ))}
        </ul>

        {/* Botón para crear factura */}
        <button onClick={createInvoice}>Crear Factura</button>
      </div>

      {/* Lista de facturas */}
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            Factura #{invoice.id} - Total: ${invoice.total}
          </li>
        ))}
      </ul>
    </div>
  );
};