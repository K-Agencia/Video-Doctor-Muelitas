import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import errorHandling from './src/middelware/errorHandling.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
// app.use('/static', express.static(__dirname + '/public'));
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server run in the port ${PORT}`);
})