import {
  CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, ConfirmSignUpCommand, AssociateSoftwareTokenCommand, VerifySoftwareTokenCommand
} from '@aws-sdk/client-cognito-identity-provider';
import secretHash from '../../helpers/secretHash.js';

const Cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_COGNITO_REGION,
});

export const registerUser = async (req, res, next) => {
  const {
    mother,
    father,
    children,
    email,
    password,
    birthdate
  } = req.body;

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

    console.log(data);
    res.status(201).json({ message: 'Usuario registrado con éxito', data: data });

  } catch (error) {
    console.error(error);
    next();
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};