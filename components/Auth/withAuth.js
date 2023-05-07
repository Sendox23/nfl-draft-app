// withAuth.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

export const withAuth = (Component) => {
  return (props) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (!user || loading) {
      return null;
    }

    return <Component {...props} />;
  };
};