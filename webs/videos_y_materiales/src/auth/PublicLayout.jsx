import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoutersLink } from '../constants/LayoutRouters';

const PublicLayout = () => {

  const { IdToken } = useSelector(({ user }) => user.token);

  if (IdToken) {
    return <Navigate to={RoutersLink.HOME} />
  }

  return <Outlet />;
};

export default PublicLayout;