import { useForm } from "react-hook-form";
import { Button, HR } from "flowbite-react";
import { IoMdLock } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import InputText from "../../../components/InputText";
import { RoutersLink } from "../../../constants/LayoutRouters";
import Notifications from "../../../components/Notifications";
import { notifications } from "../../../constants";
import { CONFIRM_FORGOT_PASSWORD } from "../../../graphql/mutation";
import Loader from "../../../components/Loader";

const NewPassword = () => {

  const navigate = useNavigate()
  const { email, code } = useLocation().state;

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      code: ''
    }
  })

  const [confirmForgotPasswordMutation, { loading }] = useMutation(CONFIRM_FORGOT_PASSWORD, {
    onError(err) {

      console.error('GraphQL Error:', err.graphQLErrors);
      console.error('Network Error:', err.networkError);

      Notifications({
        type: notifications.ERROR,
        message: err.graphQLErrors[0].message
      })

      if (err.graphQLErrors[0].message === "El código de verificación es incorrecto.") {
        navigate(RoutersLink.FORGOT_CODE, {
          state: {
            email: email
          }
        });
      }
    },
  })

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const res = await confirmForgotPasswordMutation({
        variables: {
          inputForgotPassword: {
            code: parseInt(code),
            email,
            password: data.password
          }
        }
      })

      Notifications({
        type: notifications.SUCCESS,
        message: res.data.comfirmForgotPassword
      })

      navigate(RoutersLink.LOGIN, { replace: true })

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-screen h-screen grid md:grid-cols-2 grid-cols-1'>

      <div className="hidden h-full md:flex justify-center items-center bg-amber-500">
        <p>AQUI VA UNA IMAGEN</p>
      </div>

      <div className="container h-full flex flex-col justify-center items-center">
        <form className="w-5/6 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>

          <h1 className="text-3xl font-bold mb-5">Nueva Contraseña</h1>

          <p className="text-sm mb-3 text-center">Escribe la nueva contraseña que deseas para el correo electrónico <span className="font-bold">{email}</span></p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 auto-cols-max md:gap-x-3">
            <InputText
              {...register('password', {
                required: "Este campo es requerido",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener como mínimo 8 caracteres"
                }
              })}
              type="password"
              label="Nueva Contraseña"
              placeholder="*********"
              autoComplete='off'
              icon={IoMdLock}
              required={true}
              error={errors.password}
            />

            <InputText
              {...register('comfim', {
                required: "Este campo es requerido",
                validate: (val) => {
                  if (watch('password') != val) {
                    return "Tus contraseñas no coinciden";
                  }
                },
              })}
              type="password"
              label="Confirmar Contraseña"
              placeholder="*********"
              autoComplete='off'
              icon={IoMdLock}
              required={true}
              error={errors.comfim}
            />
          </div>

          <Button className="w-1/2" type="submit">Cambiar contraseña</Button>

          <HR.Text className="my-2" />

          <div className="w-5/6 md:w-1/2">
            <Link to={RoutersLink.LOGIN} className="w-full">
              <Button outline color={'success'} className="w-full" type="button">Cancelar</Button>
            </Link>
          </div>

        </form>
      </div>

      {loading && <Loader />}

    </div>
  );
};

export default NewPassword;