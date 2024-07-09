const typeDefs = `#graphql 
  
  input InputCreateUser {
    father: InputPerson!
    mother: InputPerson!
    children: InputPerson!
    email: String!
    password: String!
  }

  input InputPerson{
    firstname:String!
    lastname: String!
    birthdate: String
  }

  input InputLogin {
    email: String!
    password: String!
  }
  
  type User {
    id: ID!
    father: Person!
    mother: Person!
    children: Person!
    email: String!
    subCognito: String
  }

  type Person{
    firstname:String!
    lastname: String!
    birthdate: String
  }

  type Acoount {
    id: ID!
    children: Person!
    token: Tokens!
  }

  type Tokens {
    AccessToken: String!
    IdToken: String!
    RefreshToken: String!
    ExpiresIn: String!
  }

  type Query{
    getUser: String
  }

  type Mutation{
    loginUser(InputLogin: InputLogin!): Acoount
    createUser(InputCreateUser: InputCreateUser!): User
  }
`;

export default typeDefs;