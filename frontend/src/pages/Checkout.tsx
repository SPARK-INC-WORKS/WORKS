import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import { CheckoutForm } from '../components/checkout/CheckoutForm';

export function Checkout() {
  const { items, total } = useCart();
  const { createOrder } = useOrder();

  return (
    <div className="pt-24 pb-16">
      <CheckoutForm
        items={items}
        total={total}
        onSubmit={createOrder}
      />
    </div>
  );
}