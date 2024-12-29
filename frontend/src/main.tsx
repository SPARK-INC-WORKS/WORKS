import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CartProvider>
      <OrderProvider>
        <RouterProvider router={router} />
      </OrderProvider>
    </CartProvider>
  </AuthProvider>
);
