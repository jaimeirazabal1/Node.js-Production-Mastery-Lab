import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Customer {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addCustomer = async () => {
    try {
      await axios.post('http://localhost:4000/api/customers', {
        name,
        address,
        phone,
      });
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Clientes</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={addCustomer}>Agregar Cliente</button>
      </div>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - {customer.address} - {customer.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};