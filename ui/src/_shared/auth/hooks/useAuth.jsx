import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPoolData } from '../services/poolService';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
// import { userPool } from '../services/poolService.js'; 

const useAuth = () => {
  const navigate  = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthStatus() {
      const poolData = await getPoolData();
      const userPool = new CognitoUserPool(poolData);
      const user = userPool.getCurrentUser();

      if (user) {
        user.getSession((err, session) => {
          if (err || !session.isValid()) {
            navigate('/login');
          } else {
            setIsAuthenticated(true);
          }
          setLoading(false);
        });
      } else {
        navigate('/login');
        setLoading(false);
      }
    }

    checkAuthStatus();
  }, [navigate]);

  return { loading, isAuthenticated };
};

export default useAuth;