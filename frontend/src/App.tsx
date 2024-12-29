import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { Cart } from './components/cart/Cart';
import { AuthModal } from './components/auth/AuthModal';
import { Toaster } from 'sonner';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
      />

      <main className="px-4 pt-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
