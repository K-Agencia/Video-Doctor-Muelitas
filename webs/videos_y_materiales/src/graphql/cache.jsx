import { gql } from "@apollo/client";

export const GET_DATA_USER = gql`
  query GetDataUser{  
    id
    children {
      firstname
      lastname
      birthdate
    } 
  } 
`;

export const GET_TOKENS_USER = gql`
  query GetTokensUser{  
    token {
      AccessToken
      IdToken
      RefreshToken
      ExpiresIn
    }
  } 
`;