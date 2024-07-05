import express from 'express';
import { registerUser } from '../middelware/aws/cognito.js';

const app = express();

app.get('/', (req, res, next) => {
  res.send("Hola");
  // next(new Error("Esto es un error!"))
})

app.post('/', registerUser);

export default app;