import {
  CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, ConfirmSignUpCommand, AssociateSoftwareTokenCommand, VerifySoftwareTokenCommand
} from '@aws-sdk/client-cognito-identity-provider';
import secretHash from '../../helpers/secretHash.js';

const Cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_COGNITO_REGION,
});

export const registerUser = async ({ data }) => {

  const {
    email,
    password
  } = data;

  const SecretHash = secretHash(email);

  const params = {
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    SecretHash: SecretHash,
    Username: email,
    Password: password
  };

  try {
    const SignUp = new SignUpCommand(params);
    const data = await Cognito.send(SignUp);
    return { subCognito: data.UserSub };
  } catch (error) {
    throw error;
  }
};

export const signInUser = async (data) => {
  const { email, password } = data;

  const SecretHash = secretHash(email);

  const signIn = new InitiateAuthCommand({
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      "SECRET_HASH": SecretHash,
      "USERNAME": email,
      "PASSWORD": password
    }
  })

  try {
    const response = await Cognito.send(signIn);
    return response;
  } catch (error) {
    throw error;
  }
}