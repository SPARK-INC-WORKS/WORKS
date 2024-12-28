import React from 'react';
import { OrderCard } from '../components/orders/OrderCard';
import { useAuth } from '../contexts/AuthContext';

export function Orders() {
  const { user } = useAuth();
  const orders = user?.orders || [];

  const activeOrders = orders.filter(order => 
    ['pending', 'confirmed', 'preparing'].includes(order.status)
  );
  const pastOrders = orders.filter(order => 
    ['ready', 'delivered'].includes(order.status)
  );

  return (
    <div className="pt-24 pb-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>

      {activeOrders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Orders</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {activeOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}

      {pastOrders.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Past Orders</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pastOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}

      {orders.length === 0 && (
        <div className="text-center text-gray-500">
          <p>You haven't placed any orders yet.</p>
        </div>
      )}
    </div>
  );
}