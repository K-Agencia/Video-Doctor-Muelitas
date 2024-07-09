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
        const res = await signInUser(InputLogin);
        console.log(res);
        return null
        // const data = await getDataUser()
      } catch (error) {
        console.log(error);
        console.log(error.__type, typeof error.__type);
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