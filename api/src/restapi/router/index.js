import express from "express";

const app = express();

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.send("Hola mundo!")
})

export default app;