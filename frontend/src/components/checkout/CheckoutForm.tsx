import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { CartItem } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckoutFormData,
  checkoutSchema,
} from '../../validations/checkout.schema';
import { UserData } from '../../contexts/AuthContext';

interface CheckoutFormProps {
  items: CartItem[];
  userData: UserData | null;
  total: number;
}

export function CheckoutForm({ items, total, userData }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmitForm = (data: CheckoutFormData) => {
    console.log('Form submitted:', {
      address: data.address,
      phone: data.phone,
      items,
      total,
      userId: userData?.id,
      username: userData?.username,
      email: userData?.email,
    });
  };

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <h2 className="mb-6 text-2xl font-bold">Checkout</h2>

      <div className="p-4 mb-6 rounded-lg bg-gray-50">
        <h3 className="mb-3 font-semibold">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="pt-2 mt-2 font-semibold border-t">
            <div className="flex justify-between">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Delivery Address
          </label>
          <textarea
            {...register('address')}
            className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${
              errors.address ? 'border-red-500' : ''
            }`}
            rows={3}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            type="tel"
            {...register('phone')}
            className={`block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 ${
              errors.phone ? 'border-red-500' : ''
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 font-semibold text-white transition-colors bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
