import React from 'react';
import { User, LogOut } from 'lucide-react';
import type { User as UserType } from '../../types';

interface ProfileSectionProps {
  user: UserType;
  onLogout: () => void;
}

export function ProfileSection({ user, onLogout }: ProfileSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-orange-100 p-3 rounded-full">
            <User className="h-6 w-6 text-orange-500" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <LogOut className="h-5 w-5 mr-1" />
          Logout
        </button>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4">Account Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className="text-gray-500">Total Orders</span>
            <p className="text-2xl font-semibold">{user.orders.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className="text-gray-500">Active Orders</span>
            <p className="text-2xl font-semibold">
              {user.orders.filter(order => 
                ['pending', 'confirmed', 'preparing'].includes(order.status)
              ).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}