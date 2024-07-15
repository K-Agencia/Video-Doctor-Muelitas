import express from "express";
import { getDataWhithRange } from "../../middleware/report/getDataWhithRange.js";

const app = express();

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.send("Hola mundo!")
})

app.get('/create/report', getDataWhithRange)

export default app;