import { useForm } from "react-hook-form";
import { Button, HR } from "flowbite-react";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import InputText from "../../../components/InputText";
import { RoutersLink } from "../../../constants/LayoutRouters";

const SendCodeEmail = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
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
          {/* <Button className="w-full" type="submit">Enviar Código</Button> */}
          <Link to={RoutersLink.FORGOT_CODE}>
            <Button outline color={'success'} className="w-full" type="button">Iniciar Sesión</Button>
          </Link>
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

export default SendCodeEmail;