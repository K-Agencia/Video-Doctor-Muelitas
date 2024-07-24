import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { Button, HR, Modal } from "flowbite-react";
import { IoMdLock, IoMdMail } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import InputText from "../../components/InputText";
import InputCheckbox from "../../components/InputCheckbox";
import Notifications from "../../components/Notifications";
import InputDatepicker from "../../components/InputDatepicker";
import { RoutersLink } from "../../constants/LayoutRouters";
import { CREATE_USER } from "../../graphql/mutation";
import { notifications } from "../../constants";
import Loader from "../../components/Loader";

const SignUp = () => {

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate()

  const [createUserMutation, { loading }] = useMutation(CREATE_USER, {
    onError(err) {
      console.error('GraphQL Error:', err.graphQLErrors);
      console.error('Network Error:', err.networkError);

      Notifications({
        type: notifications.ERROR,
        message: err.graphQLErrors[0].message
      })

      if (err.graphQLErrors[0].message === "El correo electronico no ha sido verificado.") {
        navigate(RoutersLink.SIGNUP_CONFIRM, {
          state: {
            email: watch('email')
          }
        });
      }
    }
  })

  const { register, handleSubmit, formState: { errors, isSubmitted }, watch, setValue, clearErrors, setError } = useForm({
    defaultValues: {
      father: {
        firstname: '',
        lastname: ''
      },
      mother: {
        firstname: '',
        lastname: ''
      },
      children: {
        firstname: '',
        lastname: '',
        birthdate: ''
      },
      email: '',
      password: '',
      comfim: '',
      politica: false
    }
  })

  const onSubmit = async (data) => {
    window.scrollTo(0, 0)

    try {
      const res = await createUserMutation({
        variables: {
          inputCreateUser: {
            father: {
              firstname: data.father.firstname,
              lastname: data.father.lastname,
            },
            mother: {
              firstname: data.mother.firstname,
              lastname: data.mother.lastname,
            },
            children: {
              firstname: data.children.firstname,
              lastname: data.children.lastname,
              birthdate: data.children.birthdate,
            },
            email: data.email,
            password: data.password
          }
        }
      })

      localStorage.setItem('email', res.data.createUser.email);
      navigate(RoutersLink.SIGNUP_CONFIRM, {
        replace: true
      })

    } catch (error) {
      console.log(error);
    }
  }

  console.log(loading);

  return (
    <div className={`min-w-screen min-h-screen grid md:grid-cols-2 grid-cols-1`}>

      <div className="hidden h-full md:flex justify-center items-center bg-amber-500">
        <p>AQUI VA UNA IMAGEN</p>
      </div>

      <div className={`h-full py-10 flex justify-center align-center flex-col items-center`}>
        <h1 className="text-3xl font-bold mb-5">Registrarse</h1>
        <form className="w-5/6 flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>

          <h1 className="text-xl font-bold mb-3">Información del padre</h1>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 auto-cols-max md:gap-x-3">
            <InputText
              {...register('father.firstname', {
                required: "Este campo es requerido",
                validate: (value) => {
                  if (value.trim() == "") {
                    return "Este campo no puede estar vacío"
                  }
                },
                minLength: {
                  value: 3,
                  message: "Este campo debe contener mínimo 3 letras."
                }
              })}
              label="Nombre"
              placeholder="Nombre"
              icon={FaUser}
              required={true}
              error={errors.father?.firstname}
            />

            <InputText
              {...register('father.lastname', {
                required: "Este campo es requerido",
                validate: (value) => {
                  if (value.trim() == "") {
                    return "Este campo no puede estar vacío"
                  }
                },
                minLength: {
                  value: 3,
                  message: "Este campo debe contener mínimo 3 letras."
                }
              })}
              label="Apellido"
              placeholder="Apellido"
              icon={FaUser}
              required={true}
              error={errors.father?.lastname}
            />
          </div>

          <HR.Text className="my-2" />

          <h1 className="text-xl font-bold mb-3">Información de la madre</h1>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 auto-cols-max md:gap-x-3">
            <InputText
              {...register('mother.firstname', {
                required: "Este campo es requerido",
                validate: (value) => {
                  if (value.trim() == "") {
                    return "Este campo no puede estar vacío"
                  }
                },
                minLength: {
                  value: 3,
                  message: "Este campo debe contener mínimo 3 letras."
                }
              })}
              label="Nombre"
              placeholder="Nombre"
              icon={FaUser}
              required={true}
              error={errors.mother?.firstname}
            />

            <InputText
              {...register('mother.lastname', {
                required: "Este campo es requerido",
                validate: (value) => {
                  if (value.trim() == "") {
                    return "Este campo no puede estar vacío"
                  }
                },
                minLength: {
                  value: 3,
                  message: "Este campo debe contener mínimo 3 letras."
                }
              })}
              label="Apellido"
              placeholder="Apellido"
              icon={FaUser}
              required={true}
              error={errors.mother?.lastname}
            />
          </div>

          <HR.Text className="my-2" />

          <h1 className="text-xl font-bold mb-3">Información del niño/a</h1>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 auto-cols-max md:gap-x-3">
            <InputText
              {...register('children.firstname', {
                required: "Este campo es requerido",
                validate: (value) => {
                  if (value.trim() == "") {
                    return "Este campo no puede estar vacío"
                  }
                },
                minLength: {
                  value: 3,
                  message: "Este campo debe contener mínimo 3 letras."
                }
              })}
              label="Nombre"
              placeholder="Nombre"
              icon={FaUser}
              required={true}
              error={errors.children?.firstname}
            />

            <InputText
              {...register('children.lastname', {
                required: "Este campo es requerido",
                validate: (value) => {
                  if (value.trim() == "") {
                    return "Este campo no puede estar vacío"
                  }
                },
                minLength: {
                  value: 3,
                  message: "Este campo debe contener mínimo 3 letras."
                }
              })}
              label="Apellido"
              placeholder="Apellido"
              icon={FaUser}
              required={true}
              error={errors.children?.lastname}
            />

            <InputDatepicker
              name={'children.birthdate'}
              label={"Fecha de nacimiento"}
              required={true}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              isSubmitted={isSubmitted}
              error={errors.children?.birthdate}
            />


          </div>

          <HR.Text className="my-2" />

          <h1 className="text-xl font-bold mb-3">Información para la autenticación</h1>

          <InputText
            {...register('email', {
              required: "Este campo es requerido",
              validate: (value) => {
                if (value.trim() == "") {
                  return "Este campo no puede estar vacío"
                }
              }
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
                },
                validate: (value) => {
                  if (value.trim() == "") {
                    return "Este campo no puede estar vacío"
                  }
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

          <InputCheckbox
            {...register('politica', {
              required: "Este campo es requerido"
            })}
            required={true}
            error={errors.politica}
          >
            Estoy de acuerdo con la <span className="text-blue-600 underline hover:no-underline dark:text-blue-500" onClick={() => setOpenModal(true)}>Politica de tratatiemto de datos</span>.
          </InputCheckbox>

          <Button className="w-4/6 mx-auto my-2" type="submit">Registrarse</Button>

          <HR.Text className="my-2" />

          <div className="w-4/6 mx-auto mt-2">
            <p className="text-sm text-center mb-2">Si ya estás has registrado, da clic en el siguiente botón</p>

            <Link to={RoutersLink.LOGIN}>
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

      {loading && <Loader />}

    </div>
  );
};

export default SignUp;