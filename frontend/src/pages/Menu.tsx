import React, { useState } from 'react';
import { MenuItem } from '../components/MenuItem';
import { menuItems } from '../data/menu';
import { useCart } from '../contexts/CartContext';

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();
  
  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-24 pb-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Our Menu
      </h1>
      
      <div className="flex justify-center gap-4 mb-8 overflow-x-auto">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full capitalize whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}