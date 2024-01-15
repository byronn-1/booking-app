import  useAuth  from '../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or your custom loader
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;