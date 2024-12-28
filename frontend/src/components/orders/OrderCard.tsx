import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import type { Order } from '../../types';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-purple-100 text-purple-800',
    ready: 'bg-green-100 text-green-800',
    delivered: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm text-gray-500">Order ID: {order.id}</span>
          <p className="text-lg font-semibold mt-1">${order.total.toFixed(2)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status]}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.quantity}x {item.name}</span>
            <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Delivery to: {order.address}
        </p>
        {order.notes && (
          <p className="text-sm text-gray-500 mt-2">
            Notes: {order.notes}
          </p>
        )}
      </div>
    </div>
  );
}