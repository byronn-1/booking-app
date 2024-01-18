import { useEffect } from 'react';
import useAuth from '../hooks/useAuth'
import { Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
  }, [isAuthenticated, loading])

  if (loading) {
    return <div>Loading...</div>; // or your custom loader
  }

  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
  );
}
export default ProtectedRoutes;