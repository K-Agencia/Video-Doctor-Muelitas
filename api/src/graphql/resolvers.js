import { GraphQLError } from "graphql";
import { comfirmForgotPasswordUser, forgotPasswordUser, registerUser, signInUser } from "../middleware/aws/cognito.js";
import { addAccessUser, createUserDB, getDataUserByEmail, getDataUserById } from "../middleware/db/index.js";

const resolvers = {
  Query: {
    getString() {
      return "Hola mundo";
    },
    async getUser(_, args) {
      const data = await getDataUserById({ id: args.id });
      // return null;
      return {
        id: data._id,
        father: {
          firstname: data.fa_firstname,
          lastname: data.fa_lastname,
        },
        mother: {
          firstname: data.mo_firstname,
          lastname: data.mo_lastname,
        },
        children: {
          firstname: data.ch_firstname,
          lastname: data.ch_lastname,
          birthday: data.ch_birthday,
        },
        email: data.correo
      }
    },
    async forgotPassword(_, args) {
      try {
        await forgotPasswordUser({ email: args.email });
        return `Código enviado`;
      } catch (error) {
        console.log({ error });
        throw new GraphQLError(`${error.message}`);
      }
    }
  },
  Mutation: {
    async loginUser(_, { InputLogin }) {
      try {
        const { AuthenticationResult } = await signInUser(InputLogin);
        const data = await getDataUserByEmail({ correo: InputLogin.email });
        const { _id, ch_firstname, ch_lastname, ch_birthday } = data[0];
        await addAccessUser({ id: _id });
        return {
          id: _id,
          children: {
            firstname: ch_firstname,
            lastname: ch_lastname,
            birthdate: ch_birthday,
          },
          token: {
            AccessToken: AuthenticationResult.AccessToken,
            IdToken: AuthenticationResult.IdToken,
            RefreshToken: AuthenticationResult.RefreshToken,
            ExpiresIn: AuthenticationResult.ExpiresIn,
          }
        }
      } catch (error) {
        if (error.__type === "UserNotConfirmedException") {
          throw new GraphQLError(`El correo electronico no ha sido verificado.`);
        }

        if (error.message === 'Incorrect username or password.') {
          throw new GraphQLError(`Nombre de usuario o contraseña incorrecta`);
        }

        if (error.message == "Attempt limit exceeded, please try after some time.") {
          throw new Error(`Se superó el límite de intentos fallidos. Inténtelo después de un tiempo.`);
        }

        console.log({ error });
        throw new GraphQLError(`${error.message}`);
      }
    },
    async createUser(_, { InputCreateUser }) {
      try {
        const cognito = await registerUser({
          data: {
            email: InputCreateUser.email,
            password: InputCreateUser.password,
          }
        })
        const res = await createUserDB({ ...InputCreateUser, ...cognito });
        return res;
      } catch (error) {

        console.log(error);

        if (error.message === "User already exists") {
          throw new GraphQLError(`El usuario con el correo ${InputCreateUser.email} ya existe en la base de datos`);
        }
        throw new GraphQLError(error.message);
      }
    },
    async comfirmForgotPassword(_, { InputForgotPassword }) {
      try {
        await comfirmForgotPasswordUser({
          code: InputForgotPassword.code,
          email: InputForgotPassword.email,
          password: InputForgotPassword.password
        })
        return `La contraseña se ha actualizado correctamente`;

      } catch (error) {
        console.log({ error });
        throw new GraphQLError(`${error.message}`);
      }
    }

  }
}

export default resolvers;