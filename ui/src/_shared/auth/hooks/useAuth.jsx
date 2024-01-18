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
      // console.log("user: ", user)
      if (user) {
        user.getSession((err, session) => {
          if (err || !session.isValid()) {
            navigate('/login');
          } else {
            setIsAuthenticated(true);
            const idToken = session.getIdToken().getJwtToken();
            const decodedToken = decodeJWT(idToken);
            const clubId = decodedToken['custom:clubId'];
            const ownerId = decodedToken['custom:ownerId'];
            const isOwner = decodedToken['custom:isOwner'];
            dispatch(setCredentials({
              clubId,
              ownerId,
              isOwner,
              token: idToken,
            }));
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