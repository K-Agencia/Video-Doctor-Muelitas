import { useForm } from "react-hook-form";
import { Button, HR } from "flowbite-react";
import { IoMdLock, IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import InputText from "../../components/InputText";
import { RoutersLink } from "../../constants/LayoutRouters";

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className='w-screen h-screen grid md:grid-cols-2 grid-cols-1'>

      <div className="hidden h-full md:flex justify-center items-center bg-amber-500">
        <p>AQUI VÁ UNA IMAGEN</p>
      </div>

      <div className="container h-full mt-10 flex justify-center items-center">
        <form className="w-5/6 md:w-1/2 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
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

          <Link className="w-full mb-3 text-center text-sm text-sky-600 underline" to={RoutersLink.FORGOT}>¿Has olvidado tu contraseña?</Link>

          <Button className="w-full" type="submit">Iniciar Sesión</Button>

          <HR.Text className="my-2" />

          <div className="w-5/6 mt-3">
            <p className="text-sm text-center mb-2">Si aún no te has registrado, da clic en el siguiente botón</p>

            <Link to={RoutersLink.SIGNUP}>
              <Button color={'success'} className="w-full" type="button">Resgistrarse</Button>
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;