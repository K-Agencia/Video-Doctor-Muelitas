import { createHmac } from 'crypto';

const secretHash = (username) => {
  const hasher = createHmac('sha256', process.env.AWS_COGNITO_SECRET_HASH);
  hasher.update(`${username}${process.env.AWS_COGNITO_CLIENT_ID}`);
  return hasher.digest('base64');
}

export default secretHash;