import { useForm } from "react-hook-form";
import { Button, Checkbox, HR, Label, Modal } from "flowbite-react";
import { IoMdLock, IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import InputText from "../components/InputText";
import LayoutRouters from "../constants/LayoutRouters";
import { useState } from "react";

const Registrarse = () => {

  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      padre: {
        nombre: '',
        apellido: ''
      },
      madre: {
        nombre: '',
        apellido: ''
      },
      email: '',
      password: '',
      comfim: '',
      politica: false
    }
  })

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className='min-w-screen min-h-screen grid md:grid-cols-2 grid-cols-1'>

      <div className="hidden h-full md:flex justify-center items-center bg-amber-500">
        <p>AQUI VÁ UNA IMAGEN</p>
      </div>

      <div className="container h-full  flex justify-center items-center">
        <form className="w-5/6 md:w-1/2 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold mb-5">Registrarse</h1>

          <InputText
            {...register('padre.nombre', {
              required: "Este campo es requerido"
            })}
            label="Nombre"
            placeholder="Nombre"
            icon={IoMdMail}
            error={errors.padre?.nombre}
          />

          <InputText
            {...register('padre.apellido', {
              required: "Este campo es requerido"
            })}
            label="Apellido"
            placeholder="Apellido"
            icon={IoMdMail}
            error={errors.padre?.apellido}
          />

          <InputText
            {...register('madre.nombre', {
              required: "Este campo es requerido"
            })}
            label="Nombre"
            placeholder="Nombre"
            icon={IoMdMail}
            error={errors.madre?.nombre}
          />

          <InputText
            {...register('madre.apellido', {
              required: "Este campo es requerido"
            })}
            label="Apellido"
            placeholder="Apellido"
            icon={IoMdMail}
            error={errors.madre?.apellido}
          />

          <InputText
            {...register('email', {
              required: "Este campo es requerido"
            })}
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
            autoComplete='off'
            icon={IoMdLock}
            error={errors.password}
          />

          <InputText
            {...register('comfim', {
              required: "Este campo es requerido",
              minLength: {
                value: 8,
                message: "La contraseña debe tener como mínimo 8 caracteres"
              }
            })}
            type="password"
            label="Confirmar Contraseña"
            placeholder="*********"
            autoComplete='off'
            icon={IoMdLock}
            error={errors.comfim}
          />

          <div className="flex items-center gap-2">
            <Checkbox id="accept" />
            <Label htmlFor="accept">
              Estoy de acuerdo con la <span className="text-blue-600 underline hover:no-underline dark:text-blue-500" onClick={() => setOpenModal(true)}>Politica de tratatiemto de datos</span>.
            </Label>
          </div>

          <Button className="w-full" type="submit">Registrarse</Button>

          <HR.Text className="my-2" />

          <div className="w-5/6 mt-3">
            <p className="text-sm text-center mb-2">Si ya estás has registrado, da clic en el siguiente botón</p>

            <Link to={LayoutRouters.LOGIN}>
              <Button color={'success'} className="w-full" type="button">Iniciar Sesión</Button>
            </Link>
          </div>

        </form>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Habeas Data</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Autorizo la recolección, almacenamiento, uso, tratamiento, y transmisión internacional o a terceros de mis datos personales por parte de <b>COLGATE PALMOLIVE COMPAÑÍA</b> con <b>NIT 890.300.546-6</b>, con el fin de recibir información sobre sus productos, campañas publicitarias y promociones, hacer parte de sus actividades para profesionales de la salud y recibir información comercial especializada de la misma. Esto de acuerdo a lo establecido en la Ley 1581 de 2012 y el decreto 377 de 2013, y conforme a la política de datos personales disponible en <a href="https://www.colgatepalmolive.com.co/legal-privacy-policy" className="text-cyan-600 hover:underline dark:text-cyan-500">https://www.colgatepalmolive.com.co/legal-privacy-policy</a>. Entendiendo que puedo solicitar la modificación o supresión de mis datos personales en cualquier momento.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Registrarse;