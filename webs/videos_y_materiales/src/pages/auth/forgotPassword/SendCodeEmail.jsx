import { useForm } from "react-hook-form";
import { Button, HR } from "flowbite-react";
import { IoMdMail } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../../../components/InputText";
import { RoutersLink } from "../../../constants/LayoutRouters";
import { useLazyQuery } from "@apollo/client";
import { FORGOT_PASSWORD } from "../../../graphql/queries";
import Notifications from "../../../components/Notifications";
import { notifications } from "../../../constants";
import Loader from "../../../components/Loader";

const SendCodeEmail = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: "",
    }
  })

  const [forgotPasswordQuery, { loading }] = useLazyQuery(FORGOT_PASSWORD, {
    onError(err) {
      console.error('GraphQL Error:', err.graphQLErrors);
      console.error('Network Error:', err.networkError);

      Notifications({
        type: notifications.ERROR,
        message: err.graphQLErrors[0].message
      })

      if (err.graphQLErrors[0].message == "El correo electronico no ha sido verificado.") {
        navigate(RoutersLink.SIGNUP_CONFIRM, {
          state: {
            email: watch('email')
          }
        });
      }
    }
  })

  const onSubmit = async (data) => {
    try {
      const res = await forgotPasswordQuery({
        variables: {
          email: data.email
        }
      })

      Notifications({
        type: notifications.SUCCESS,
        message: res.data.forgotPassword
      })

      navigate(RoutersLink.FORGOT_CODE, {
        state: {
          email: data.email
        }
      })

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
        <form className="w-5/6 md:w-4/6 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>

          <h1 className="text-3xl font-bold mb-5">Recuperar Contraseña</h1>

          <p className="text-sm mb-3 text-center">Escribe el correo electrónico de la cuenta a la que quieres recuperar la contraseña</p>

          <InputText
            {...register('email', {
              required: "Este campo es requerido"
            })}
            type="email"
            label="Correo Electrónico"
            placeholder="ejemplo@dominio.com"
            icon={IoMdMail}
            error={errors.email}
          />
          <Button className="w-full" type="submit">Enviar Código</Button>

          <div className="w-full mt-3">
            <Link to={RoutersLink.LOGIN}>
              <Button outline color={'success'} className="w-full" type="button">Iniciar Sesión</Button>
            </Link>
          </div>

        </form>

        <HR.Text className="my-2" />

      </div>

      {loading && <Loader />}

    </div>
  );
};

export default SendCodeEmail;