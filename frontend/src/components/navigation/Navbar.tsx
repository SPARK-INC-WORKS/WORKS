import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { CartButton } from './CartButton';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  onCartClick: () => void;
  onAuthClick: () => void;
}

export function Navbar({ onCartClick, onAuthClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { items } = useCart();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { path: '/', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/reservations', label: 'Reservations' },
  ];

  const authItems = [
    { path: '/orders', label: 'Orders' },
    { path: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center text-orange-500">
              <UtensilsCrossed className="h-8 w-8" />
              <span className="ml-2 text-xl font-semibold text-gray-900 hidden sm:block">
                Gourmet Haven
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-orange-50 text-orange-500'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {user ? (
              authItems.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-orange-50 text-orange-500'
                        : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))
            ) : (
              <button
                onClick={onAuthClick}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50"
              >
                Login
              </button>
            )}

            <CartButton count={cartItemsCount} onClick={onCartClick} />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <CartButton count={cartItemsCount} onClick={onCartClick} />
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              navItems={navItems}
              authItems={authItems}
              isAuthenticated={!!user}
              onAuthClick={onAuthClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}