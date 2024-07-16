import axios from 'axios';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
// import { refreshTokens } from '../middleware/aws/cognito.js';

export const verifyIdToken = async (headers) => {

  const idToken = headers.authorization || '';
  // const refreshToken = headers["x-refresh-token"] || '';
  // const isRefresh = headers.isRefresh;

  try {
    const token = idToken.split(' ')[1];

    // if (!token) return null;
    if (!idToken) throw new Error(`No se ha proporcionado el token`);
    const decoded = jwt.decode(idToken, { complete: true });

    // if (!decoded) return null;
    if (!decoded) throw new Error(`No se puede decodificar el token`);

    const jwksUrl = `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`;
    const { data } = await axios.get(jwksUrl);

    const jwk = data.keys.find((key) => key.kid === decoded.header.kid);

    // if (!jwk) return null;
    if (!jwk) throw new Error(`El token no coincide con el con las claves de acceso`);

    const pem = jwkToPem(jwk);

    const { email, sub } = jwt.verify(idToken, pem, { algorithms: ['RS256'] })
    // const { email, sub } = jwt.verify(idToken, pem, { algorithms: ['RS256'] }, async (err, token) => {
    // if (err) {
    //   if (err.message === "jwt expired") {
    //     // console.log(err);
    //     const newTokens = await refreshTokens({ refreshToken, sub: decoded.payload.sub });
    //     const headers = {};
    //     // console.log(newTokens);
    //     headers.isRefresh = true;
    //     headers.authorization = newTokens.idToken;
    //     headers["x-refresh-token"] = refreshToken;

    //     return await verifyIdToken(headers)
    //   }
    //   throw new Error(err)
    // }

    // return token
    // });

    return {
      email,
      sub
    }

  } catch (error) {
    console.log(error);
    throw new GraphQLError(`${error.message}`);
  }
};