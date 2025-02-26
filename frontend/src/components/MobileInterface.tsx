import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

export const MobileInterface: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/api/products'
        );
        setProducts(response.data.data);
      } catch (err) {
        setError('Error loading products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📱 Mobile Store</h1>
      
      {loading ? (
        <p style={styles.loading}>Loading products...</p>
      ) : error ? (
        <p style={styles.error}>❌ {error}</p>
      ) : (
        <div style={styles.productList}>
          {products.map((product) => (
            <div key={product.id} style={styles.productCard}>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productPrice}>${Number(product.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center' as const,
    color: '#333',
    marginBottom: '30px'
  },
  productList: {
    display: 'grid',
    gap: '15px'
  },
  productCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  productName: {
    margin: '0 0 10px 0',
    color: '#222'
  },
  productPrice: {
    margin: '0',
    color: '#666',
    fontWeight: 'bold'
  },
  loading: {
    textAlign: 'center' as const,
    color: '#666'
  },
  error: {
    textAlign: 'center' as const,
    color: 'red'
  }
};