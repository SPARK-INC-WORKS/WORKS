import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signupSchema } from '../../validations/auth.schema';
import { FormInput } from '../forms/FormInput';
import type { LoginFormData, SignupFormData } from '../../validations/auth.schema';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, name: string) => void;
}

export function AuthModal({ isOpen, onClose, onLogin, onSignup }: AuthModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">
          {isLoginMode ? 'Welcome Back' : 'Create Account'}
        </h2>

        {isLoginMode ? (
          <form onSubmit={handleLoginSubmit((data) => onLogin(data.email, data.password))}>
            <div className="space-y-4">
              <FormInput
                label="Email"
                name="email"
                register={loginRegister}
                error={loginErrors.email?.message}
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                register={loginRegister}
                error={loginErrors.password?.message}
              />
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit((data) => onSignup(data.email, data.password, data.name))}>
            <div className="space-y-4">
              <FormInput
                label="Name"
                name="name"
                register={signupRegister}
                error={signupErrors.name?.message}
              />
              <FormInput
                label="Email"
                name="email"
                register={signupRegister}
                error={signupErrors.email?.message}
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                register={signupRegister}
                error={signupErrors.password?.message}
              />
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}

        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="mt-4 text-sm text-orange-500 hover:text-orange-600"
        >
          {isLoginMode ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}