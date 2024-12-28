import React from 'react';
import { ProfileSection } from '../components/profile/ProfileSection';
import { Orders } from './Orders';
import type { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

export function Profile({ user, onLogout }: ProfileProps) {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <ProfileSection user={user} onLogout={onLogout} />
        <div className="mt-8">
          <Orders orders={user.orders} />
        </div>
      </div>
    </div>
  );
}