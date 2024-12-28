import React from 'react';
import { Mail, MessageSquare, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../validations/contact.schema';
import { FormInput } from '../components/forms/FormInput';
import { FormTextarea } from '../components/forms/FormTextarea';
import type { ContactFormData } from '../validations/contact.schema';

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            label="Name"
            name="name"
            register={register}
            icon={User}
            error={errors.name?.message}
            placeholder="Your name"
          />

          <FormInput
            label="Email"
            name="email"
            register={register}
            icon={Mail}
            error={errors.email?.message}
            placeholder="your.email@example.com"
          />

          <FormTextarea
            label="Message"
            name="message"
            register={register}
            error={errors.message?.message}
            placeholder="How can we help you?"
            rows={4}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
          <div className="space-y-4 text-gray-600">
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@gourmethaven.com</p>
            <p>Address: 123 Gourmet Street, Foodie City, FC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}