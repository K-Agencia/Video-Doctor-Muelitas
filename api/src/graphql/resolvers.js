import { GraphQLError } from "graphql";
import { comfirmForgotPasswordUser, forgotPasswordUser, registerUser, signInUser } from "../middleware/aws/cognito.js";
import { addAccessUser, createUserDB, getDataUserByEmail, getDataUserById } from "../middleware/db/index.js";

const resolvers = {
  Query: {
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
        return `Cógigo enviado`;
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
          throw new GraphQLError(`El usuario no está confirmado. Por favor revise la bandeja de su correo electrónico (${InputLogin.email}) y confirme su cuenta, haciendo clic en el enlace.`);
        }

        if (error.message) {
          throw new GraphQLError(`${error.message}`);
        }
        console.log({ error });
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