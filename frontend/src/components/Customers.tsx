import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

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
    <Container>
      <Typography variant="h4" gutterBottom>
        Clientes
      </Typography>
      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addCustomer}>
        Agregar Cliente
      </Button>
      <List>
        {customers.map((customer) => (
          <ListItem key={customer.id}>
            <ListItemText
              primary={customer.name}
              secondary={`Dirección: ${customer.address} - Teléfono: ${customer.phone}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};