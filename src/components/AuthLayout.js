'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '../lib/axios';

export default function AuthLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('access_token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Make a request to verify the token is valid
        await api.post('/auth/token/verify/', {token: token}); // Adjust this endpoint based on your API
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response?.status === 401) {
          // Token is invalid or expired
          Cookies.remove('access_token');
          router.push('/login');
          return;
        }
        // For other errors, we might want to still allow access
        // or handle them differently based on your requirements
        console.error('Auth check error:', error);
        setIsAuthenticated(true); // Allow access for now, adjust as needed
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? children : null;
} 