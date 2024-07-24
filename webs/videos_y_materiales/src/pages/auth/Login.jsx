import { useForm } from "react-hook-form";
import { Button, HR } from "flowbite-react";
import { IoMdLock, IoMdMail } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import InputText from "../../components/InputText";
import { RoutersLink } from "../../constants/LayoutRouters";
import { LOGIN_USER } from "../../graphql/mutation";
import Notifications from "../../components/Notifications";
import { notifications } from "../../constants";
import { setDataUser } from "../../store/reducer/user";
import Loader from "../../components/Loader";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const [loginUserMutation, { loading }] = useMutation(LOGIN_USER, {
    onError(err) {

      console.error('GraphQL Error:', err.graphQLErrors);
      console.error('Network Error:', err.networkError);

      Notifications({
        type: notifications.ERROR,
        message: err.graphQLErrors[0].message
      })

      if (err.graphQLErrors[0].message === "El usuario no está confirmado") {
        navigate(RoutersLink.SIGNUP_CONFIRM, {
          state: {
            email: watch('email')
          }
        });
      }
    },
  })

  const onSubmit = async (info) => {
    console.log(info);

    try {
      const res = await loginUserMutation({
        variables: {
          inputLogin: {
            email: info.email,
            password: info.password
          },
        },
      });

      dispatch(setDataUser(res.data.loginUser));

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='w-screen h-screen grid md:grid-cols-2 grid-cols-1'>

      <div className="hidden h-full md:flex justify-center items-center bg-amber-500">
        <p>AQUI VA UNA IMAGEN</p>
      </div>

      <div className="container h-full flex justify-center items-center">
        <form className="w-5/6 md:w-4/6 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold mb-5">Iniciar Sesión</h1>

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

          <InputText
            {...register('password', {
              required: "Este campo es requerido",
              minLength: {
                value: 8,
                message: "La contraseña debe tener como mínimo 8 caracteres"
              }
            })}
            type="password"
            label="Contraseña"
            placeholder="*********"
            icon={IoMdLock}
            error={errors.password}
          />

          <Button className="w-full mb-3" type="submit">Iniciar Sesión</Button>

          <Link className="w-full text-center text-sm text-sky-600 underline" to={RoutersLink.FORGOT}>¿Has olvidado tu contraseña?</Link>

          <HR.Text className="my-2" />

          <div className="mt-3">
            <p className="text-sm text-center mb-2">Si aún no te has registrado, da clic en el siguiente botón</p>

            <Link to={RoutersLink.SIGNUP}>
              <Button color={'success'} className="w-full" type="button">Resgistrarse</Button>
            </Link>
          </div>

          {loading && <Loader />}
        </form>

      </div>
    </div>
  );
};

export default Login;