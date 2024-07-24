import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoutersLink } from '../constants/LayoutRouters';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivateLayout = () => {

  const { IdToken } = useSelector(({ user }) => user.token);

  if (!IdToken) {
    return <Navigate to={RoutersLink.LOGIN} />
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateLayout;