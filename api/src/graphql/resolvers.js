import { GraphQLError } from "graphql";
import { registerUser, signInUser } from "../middleware/aws/cognito.js";
import { createUserDB, getDataUser } from "../middleware/resolvers/index.js";

const resolvers = {
  Query: {
    getUser(root, args) {
      console.log(root);
      return "Hola mundo"
    }
  },
  Mutation: {
    async loginUser(_, { InputLogin }) {
      try {
        const { AuthenticationResult } = await signInUser(InputLogin);
        const data = await getDataUser({ correo: InputLogin.email });
        const { _id, ch_firstname, ch_lastname, ch_birthday } = data[0];
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

        console.log(cognito);
        const res = await createUserDB({ ...InputCreateUser, ...cognito });
        console.log(res);
        return res;
        // return null;
      } catch (error) {
        console.log(error);
      }
    },

  }
}

export default resolvers;