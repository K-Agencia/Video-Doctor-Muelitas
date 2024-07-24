import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, HR } from "flowbite-react";
import { IoKeypad } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import InputText from "../../../components/InputText";
import { RoutersLink } from "../../../constants/LayoutRouters";
import Notifications from "../../../components/Notifications";
import { notifications } from "../../../constants";
import { FORGOT_PASSWORD } from "../../../graphql/queries";
import Loader from "../../../components/Loader";

const ConfirmCode = () => {

  const navigate = useNavigate();
  const { email } = useLocation().state

  const timing = 30;
  const [seconds, setSeconds] = useState(timing);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code: ''
    }
  });

  const [forgotPasswordQuery, { loading }] = useLazyQuery(FORGOT_PASSWORD, {
    onError(err) {
      console.error('GraphQL Error:', err.graphQLErrors);
      console.error('Network Error:', err.networkError);

      Notifications({
        type: notifications.ERROR,
        message: err.graphQLErrors[0].message
      })
    }
  })

  const onSubmit = (data) => {
    console.log(data);
    navigate(RoutersLink.FORGOT_NEWPASSWORD, {
      state: {
        email: email,
        code: data.code
      }
    })
  }

  const handleClick = async () => {

    try {
      await forgotPasswordQuery({
        variables: {
          email: email
        }
      })

      Notifications({
        type: notifications.INFO,
        message: "El código de verificación se ha enviado correctamente."
      })

      setButtonEnabled(false);
      setSeconds(timing);

    } catch (error) {
      console.log(error);
    }
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
        <p>AQUI VA UNA IMAGEN</p>
      </div>

      <div className="container h-full flex flex-col justify-center items-center">
        <form className="w-5/6 md:w-4/6 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>

          <h1 className="text-3xl font-bold mb-5">Cambiar contraseña</h1>

          <p className="text-sm text-center">Se ha enviado un código de verificación a su correo electrónico <span className="font-bold">{email}</span> para que pueda realizar el cambio de contraseña.</p>

          {buttonEnabled &&
            <Button size={'sm'} color={"light"} className={`my-1 border-0 text-sky-600`} onClick={handleClick} disabled={!buttonEnabled}>
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
            autoComplete={'off'}
          />

          <Button className="w-full" type="submit">Enviar Código</Button>

          <Link to={RoutersLink.FORGOT}>
            <Button
              size={'sm'}
              color={"light"} className={`my-1 border-0 text-sky-600`}
            >
              <p className="underline">Cambiar de correo electrónico</p>
            </Button>
          </Link>

          <HR.Text className="my-2" />

          <div className="w-full">
            <Link to={RoutersLink.LOGIN}>
              <Button outline color={'success'} className="w-full" type="button">Cancelar</Button>
            </Link>
          </div>

        </form>

      </div>
      {loading && <Loader />}
    </div>
  );
};

export default ConfirmCode;