import { useEffect } from 'react';
import useAuth from '../hooks/useAuth'
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_CLUB_DETAILS } from '../../../_graphQL/querys/clubQueries';
import { setClubDetails } from '../../redux/slices/clubSlice';

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const clubId = useSelector((state) => state.auth.clubId);

  const { loading: authLoading, isAuthenticated } = useAuth();

  const { data: clubData, loading: clubDataLoading, error: clubDataError } = useQuery(GET_CLUB_DETAILS, {
    variables: { clubId },
    skip: !clubId || !isAuthenticated,
  });

  /*   useEffect(() => {
    }, [isAuthenticated, loading]) */

  useEffect(() => {
    if (!clubDataLoading && clubData && isAuthenticated) {
      dispatch(setClubDetails(clubData.getClubDetails));
    }
  }, [dispatch, clubData, isAuthenticated, clubDataLoading]);

  if (authLoading || clubDataLoading) {
    return <div>Loading...</div>; // or your custom loader
  }

  if (clubDataError) {
    console.error('Error fetching club details:', clubDataError);

  }
  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
  );
}
export default ProtectedRoutes;