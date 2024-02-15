import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPoolData } from '../services/poolService';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { useDispatch } from 'react-redux';
import { decodeJWT } from '../services/jwtAuthService';
import { setCredentials } from '../../redux/slices/authSlice';
// import { userPool } from '../services/poolService.js'; 

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthStatus() {
      const poolData = await getPoolData();
      const userPool = new CognitoUserPool(poolData);
      const user = userPool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err || !session.isValid()) {
            navigate('/login');
          } else {
            setIsAuthenticated(true);
            const idToken = session.getIdToken().getJwtToken();
            const decodedToken = decodeJWT(idToken);
            // Assuming you have a custom attribute or logic to determine the user role
            const userRole = decodedToken['custom:role']; // Ensure this attribute exists in your token
            navigate(navigateBasedOnRole(userRole));
            const credentials = {
              // Extract necessary credentials here
            };
            dispatch(setCredentials(credentials));
          }
          setLoading(false);
        });
      } else {
        navigate('/login');
        setLoading(false);
      }
    }

    checkAuthStatus();
  }, [navigate, dispatch]);

  return { loading, isAuthenticated };
};

export default useAuth;