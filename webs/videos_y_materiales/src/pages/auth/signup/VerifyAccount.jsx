import { Button, HR } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { RoutersLink } from '../../../constants/LayoutRouters';

const VerifyAccount = () => {
  return (
    <div className='w-screen h-screen grid md:grid-cols-2 grid-cols-1'>

      <div className="hidden h-full md:flex justify-center items-center bg-amber-500">
        <p>AQUI VÁ UNA IMAGEN</p>
      </div>

      <div className="container h-full mt-10 flex flex-col justify-center items-center">
        <div className="w-5/6 md:w-1/2 flex flex-col justify-center items-center">

          <h1 className='text-lg text-center font-bold'>Tu cuenta ha sido verificada correctamente</h1>
          <HR.Text className="my-2" />
          <div className="w-5/6 mt-3">
            <Link to={RoutersLink.LOGIN}>
              <Button color={'success'} className="w-full" type="button">Iniciar Sesión</Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;