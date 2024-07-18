import { useForm } from "react-hook-form";
import { Button, HR } from "flowbite-react";
import { IoMdLock } from "react-icons/io";
import { Link } from "react-router-dom";
import InputText from "../../../components/InputText";
import { RoutersLink } from "../../../constants/LayoutRouters";

const NewPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      code: ''
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

      <div className="container h-full mt-10 flex flex-col justify-center items-center">
        <form className="w-5/6 md:w-1/2 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>

          <h1 className="text-3xl font-bold mb-5">Recuperar Contraseña</h1>

          <p className="text-sm mb-3 text-center">Escribe el correo electrónico de la cuenta a la que quieres recuperar la contraseña</p>

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

          <Button className="w-full" type="submit">Cambiar contraseña</Button>
        </form>

        <HR.Text className="my-2" />

        <div className="w-5/6 mt-3">
          <Link to={RoutersLink.LOGIN}>
            <Button outline color={'success'} className="w-full" type="button">Iniciar Sesión</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;