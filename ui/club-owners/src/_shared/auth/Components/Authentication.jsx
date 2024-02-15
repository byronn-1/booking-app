import { useEffect, useState } from 'react';
import { userPool } from '../services/poolService.js'; 
import { useNavigate } from 'react-router-dom';

const Authentication = ({ children }) => {
  const navigate  = useNavigate ();
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const user = userPool.getCurrentUser();

  if (!user) {
    navigate('/login');
    return;
  }
  
  user.getSession((err, session) => {
    if (err || !session.isValid()) {
      console.error(err);
      navigate('/login');
    } else {
      navigate('/');
      setLoading(false);
    }
  });
}, [navigate]);


if (loading) {
  return <div>Loading...</div>; // or your custom loader
}

return <>{children}</>;
};

export default Authentication;