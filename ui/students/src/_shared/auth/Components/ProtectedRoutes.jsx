import { useEffect } from 'react';
import useAuth from '../hooks/useAuth'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
  }, [isAuthenticated, loading])

  if (loading) {
    return <div>Loading...</div>; // or your custom loader
  }

  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/user/" replace />
  );
}
export default ProtectedRoutes;