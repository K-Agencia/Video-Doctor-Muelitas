import { HR } from "flowbite-react";
import { useLocation } from "react-router-dom";

const ConfirmAccount = () => {

  const { email } = useLocation().state;

  return (
    <div className='w-screen h-screen grid md:grid-cols-2 grid-cols-1'>

      <div className="hidden h-full md:flex justify-center items-center bg-amber-500">
        <p>AQUI VA UNA IMAGEN</p>
      </div>

      <div className="container w-full h-full flex flex-col justify-center items-center">
        <div className="w-5/6">
          <h1 className="text-3xl text-center font-bold">Verificación de cuenta</h1>
          <HR.Text className="my-5" />
          <p className="text-sm text-center">Gracias por registrarte. Por favor, verifica tu cuenta haciendo clic en el enlace que te enviamos a tu correo electrónico <span className="font-bold">{email}</span>. Si no encuentras el correo, revisa tu bandeja de spam.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAccount;