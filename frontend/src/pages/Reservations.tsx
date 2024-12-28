import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reservationSchema } from '../validations/reservation.schema';
import { FormInput } from '../components/forms/FormInput';
import { FormSelect } from '../components/forms/FormSelect';
import type { ReservationFormData } from '../validations/reservation.schema';

export function Reservations() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = (data: ReservationFormData) => {
    console.log('Reservation submitted:', data);
  };

  const timeOptions = [
    { value: '', label: 'Select time' },
    { value: '17:00', label: '5:00 PM' },
    { value: '17:30', label: '5:30 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '18:30', label: '6:30 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '19:30', label: '7:30 PM' },
    { value: '20:00', label: '8:00 PM' },
    { value: '20:30', label: '8:30 PM' },
    { value: '21:00', label: '9:00 PM' },
  ];

  const guestOptions = Array.from({ length: 8 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} ${i === 0 ? 'Guest' : 'Guests'}`,
  }));

  const occasionOptions = [
    { value: '', label: 'Select occasion (optional)' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'business', label: 'Business Dinner' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Make a Reservation
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Date"
              name="date"
              type="date"
              register={register}
              icon={Calendar}
              error={errors.date?.message}
            />

            <FormSelect
              label="Time"
              name="time"
              register={register}
              options={timeOptions}
              icon={Clock}
              error={errors.time?.message}
            />

            <FormSelect
              label="Number of Guests"
              name="guests"
              register={register}
              options={guestOptions}
              icon={Users}
              error={errors.guests?.message}
            />

            <FormSelect
              label="Special Occasion"
              name="occasion"
              register={register}
              options={occasionOptions}
              error={errors.occasion?.message}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Reserve Table
          </button>
        </form>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Reservation Policy</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Reservations can be made up to 30 days in advance</li>
            <li>• Please arrive within 15 minutes of your reservation time</li>
            <li>• For parties larger than 8, please call us directly</li>
            <li>• Special requests are subject to availability</li>
          </ul>
        </div>
      </div>
    </div>
  );
}