import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Menu } from '../pages/Menu';
import { Orders } from '../pages/Orders';
import { Profile } from '../pages/Profile';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { Reservations } from '../pages/Reservations';
import { Checkout } from '../pages/Checkout';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'reservations',
        element: <Reservations />,
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
