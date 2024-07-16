import {
  CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, ConfirmSignUpCommand, AssociateSoftwareTokenCommand, VerifySoftwareTokenCommand,
  ForgotPasswordCommand,
  AdminGetUserCommand,
  ListUserPoolsCommand,
  ConfirmForgotPasswordCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { fromIni } from "@aws-sdk/credential-providers";
import secretHash from '../../helpers/secretHash.js';

const Cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_COGNITO_REGION,
  credentials: fromIni({ profile: 'newAccess-Dev' })
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

export const forgotPasswordUser = async ({ email }) => {
  try {
    const SecretHash = secretHash(email);

    const getUser = new AdminGetUserCommand({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      Username: email
    })

    await Cognito.send(getUser);

    const forgotPassword = new ForgotPasswordCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      Username: email,
      SecretHash
    })

    await Cognito.send(forgotPassword);
    return true;
  } catch (error) {
    if (error.message == "User does not exist.") {
      throw new Error(`El usuario con el correo '${email}' no existe en nuestra base de datos.`);
    }
    throw error;
  }
}

export const comfirmForgotPasswordUser = async ({ code, email, password }) => {
  try {
    const SecretHash = secretHash(email);

    const forgotPassword = new ConfirmForgotPasswordCommand({
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      ConfirmationCode: code.toString(),
      Username: email,
      Password: password,
      SecretHash
    })

    await Cognito.send(forgotPassword);
    return true;
  } catch (error) {
    if (error.message == "Invalid verification code provided, please try again.") {
      throw new Error(`El código de verificación es incorrecto. Por favor, revisa nuevamente el código y vuelve a intentarlo más tarde.`);
    }
    throw error;
  }
}


export const refreshTokens = async ({ refreshToken, sub }) => {

  const SecretHash = secretHash(sub);

  const params = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      SECRET_HASH: SecretHash
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await Cognito.send(command);
    const { AccessToken, IdToken } = response.AuthenticationResult;

    return {
      accessToken: AccessToken,
      idToken: IdToken,
    };

  } catch (error) {
    console.error('Error refreshing tokens:', error);
    throw error;
  }
};