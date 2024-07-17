import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, HR, Modal } from "flowbite-react";
import { IoMdLock, IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import InputText from "../components/InputText";
import LayoutRouters from "../constants/LayoutRouters";
import InputCheckbox from "../components/InputCheckbox";
// import Notifications from "../components/Notifications";
// import { notifications } from "../constants";

const Registrarse = () => {

  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
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

      <div className="container h-full mt-10 flex justify-center items-center">
        <form className="w-5/6 md:w-1/2 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold mb-5">Registrarse</h1>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 auto-cols-max md:gap-x-3">
            <InputText
              {...register('padre.nombre', {
                required: "Este campo es requerido"
              })}
              label="Nombre"
              placeholder="Nombre"
              icon={FaUser}
              required={true}
              error={errors.padre?.nombre}
            />

            <InputText
              {...register('padre.apellido', {
                required: "Este campo es requerido"
              })}
              label="Apellido"
              placeholder="Apellido"
              icon={FaUser}
              required={true}
              error={errors.padre?.apellido}
            />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 auto-cols-max md:gap-x-3">
            <InputText
              {...register('madre.nombre', {
                required: "Este campo es requerido"
              })}
              label="Nombre"
              placeholder="Nombre"
              icon={FaUser}
              required={true}
              error={errors.madre?.nombre}
            />

            <InputText
              {...register('madre.apellido', {
                required: "Este campo es requerido"
              })}
              label="Apellido"
              placeholder="Apellido"
              icon={FaUser}
              required={true}
              error={errors.madre?.apellido}
            />
          </div>

          <InputText
            {...register('email', {
              required: "Este campo es requerido"
            })}
            label="Correo Electrónico"
            placeholder="ejemplo@dominio.com"
            icon={IoMdMail}
            required={true}
            error={errors.email}
          />

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
              label="Contraseña"
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

          {/* <div className="flex items-center gap-2">
            
          </div> */}

          <InputCheckbox
            {...register('politica', {
              required: "Este campo es requerido"
            })}
            required={true}
            error={errors.politica}
          >
            Estoy de acuerdo con la <span className="text-blue-600 underline hover:no-underline dark:text-blue-500" onClick={() => setOpenModal(true)}>Politica de tratatiemto de datos</span>.
          </InputCheckbox>

          <Button className="w-full mt-5" type="submit">Registrarse</Button>

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