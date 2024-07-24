import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($inputLogin: InputLogin!) {
    loginUser(InputLogin: $inputLogin) {
      id
      children {
        firstname
        lastname
        birthdate
      }
      token {
        AccessToken
        IdToken
        RefreshToken
        ExpiresIn
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($inputCreateUser: InputCreateUser!) {
    createUser(InputCreateUser: $inputCreateUser) {
      email
    }
  }
`;

export const CONFIRM_FORGOT_PASSWORD = gql`
  mutation ComfirmForgotPassword($inputForgotPassword: InputForgotPassword!) {
    comfirmForgotPassword(InputForgotPassword: $inputForgotPassword)
  }
`;