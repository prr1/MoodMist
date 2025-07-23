import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signIn, signUp } from '../lib/supabase';
import { Music, Mail, Lock, User, Loader2 } from 'lucide-react';

const signInSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const signUpSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});

type SignInFormData = yup.InferType<typeof signInSchema>;
type SignUpFormData = yup.InferType<typeof signUpSchema>;

export const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInForm = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignIn = async (data: SignInFormData) => {
    setLoading(true);
    setError(null);
    
    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      setError(error.message);
    }
    
    setLoading(false);
  };

  const handleSignUp = async (data: SignUpFormData) => {
    setLoading(true);
    setError(null);
    
    const { error } = await signUp(data.email, data.password, data.name);
    
    if (error) {
      setError(error.message);
    } else {
      setIsSignUp(false);
      signInForm.setValue('email', data.email);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            MoodTunes
          </h1>
          <p className="text-gray-600 mt-2">AI-Powered Music Curation</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
          <div className="flex mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                !isSignUp
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                isSignUp
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isSignUp ? (
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...signUpForm.register('name')}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50"
                    placeholder="Your full name"
                  />
                </div>
                {signUpForm.formState.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{signUpForm.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...signUpForm.register('email')}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50"
                    placeholder="your@email.com"
                  />
                </div>
                {signUpForm.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{signUpForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...signUpForm.register('password')}
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50"
                    placeholder="••••••••"
                  />
                </div>
                {signUpForm.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">{signUpForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...signUpForm.register('confirmPassword')}
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50"
                    placeholder="••••••••"
                  />
                </div>
                {signUpForm.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{signUpForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...signInForm.register('email')}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50"
                    placeholder="your@email.com"
                  />
                </div>
                {signInForm.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{signInForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    {...signInForm.register('password')}
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50"
                    placeholder="••••••••"
                  />
                </div>
                {signInForm.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">{signInForm.formState.errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Demo credentials: demo@example.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};