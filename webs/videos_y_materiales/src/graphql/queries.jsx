import { gql } from "@apollo/client"

export const GET_USER = gql`
query GetUser($getUserId: String!) {
  getUser(id: $getUserId) {
    id
    father {
      firstname
      lastname
      birthdate
    }
    mother {
      firstname
      lastname
      birthdate
    }
    children {
      firstname
      lastname
      birthdate
    }
    email
    subCognito
  }
}
`;

export const FORGOT_PASSWORD = gql`
  query ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;