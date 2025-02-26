import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Products } from './components/Products';
import { Customers } from './components/Customers';
import { Invoices } from './components/Invoices';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/" element={<h1>Bienvenido al sistema de bodegas</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;