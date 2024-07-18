import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, HR } from "flowbite-react";
import { IoKeypad } from "react-icons/io5";
import { Link } from "react-router-dom";
import InputText from "../../../components/InputText";
import { RoutersLink } from "../../../constants/LayoutRouters";
import Notifications from "../../../components/Notifications";
import { notifications } from "../../../constants";

const ConfirmCode = () => {

  const timing = 5;
  const [seconds, setSeconds] = useState(timing);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code: ''
    }
  })

  const onSubmit = (data) => {
    console.log(data);
  }

  const handleClick = () => {
    Notifications({
      type: notifications.INFO,
      message: "El código de verificación se ha enviado correctamente."
    })
    setButtonEnabled(false);
    setSeconds(timing);
  };

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setButtonEnabled(true);
    }
  }, [seconds]);

  // useEffect(() => {
  //   // setTime(new Date(localStorage.getItem('time-code')));
  //   clearTimer(getDeadTime());
  // }, []);

  return (
    <div className='w-screen h-screen grid md:grid-cols-2 grid-cols-1'>

      <div className="hidden h-full md:flex justify-center items-center bg-amber-500">
        <p>AQUI VÁ UNA IMAGEN</p>
      </div>

      <div className="container h-full mt-10 flex flex-col justify-center items-center">
        <form className="w-5/6 md:w-1/2 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>

          <h1 className="text-3xl font-bold mb-5">Recuperar Contraseña</h1>

          <p className="text-sm text-center">Escribe el correo electrónico de la cuenta a la que quieres recuperar la contraseña</p>

          {buttonEnabled &&
            <Button size={'sm'} className={`my-1 border-0 bg-transparent text-sky-600 active:bg-sky-600 active:text-white`} onClick={handleClick} disabled={!buttonEnabled}>
              <p className="underline">Reenviar el código de verificación</p>
            </Button>
          }

          {!buttonEnabled &&
            <p className="my-3 text-sm text-sky-600">Reenviar el código de verificación en: <span className="font-bold">{seconds} seg</span>.</p>
          }

          <InputText
            {...register('code', {
              required: "Este campo es requerido",
              maxLength: {
                value: 6,
                message: "El código no puede superar los 6 dígitos."
              },
              minLength: {
                value: 6,
                message: "El código debe tener como mínimo 6 dígitos."
              }
            })}
            type="number"
            label="Código de verificación"
            placeholder="123456"
            icon={IoKeypad}
            error={errors.code}
          />

          <Button className="w-full" type="submit">Enviar Código</Button>

          <Link to={RoutersLink.FORGOT}>
            <Button
              size={'sm'}
              className={`my-1 border-0 bg-transparent text-sky-600 active:bg-sky-600 active:text-white`}
              disabled={!buttonEnabled}
            >
              <p className="underline">Cambiar de correo electrónico</p>
            </Button>
          </Link>
          {/* <Link to={RoutersLink.FORGOT_NEWPASSWORD}>
            <Button outline color={'success'} className="w-full" type="button">Iniciar Sesión</Button>
          </Link> */}
        </form>

        <HR.Text className="my-2" />

        <div className="w-5/6 md:w-1/2">
          <Link to={RoutersLink.LOGIN} className="w-full">
            <Button outline color={'success'} className="w-full" type="button">Cancelar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCode;