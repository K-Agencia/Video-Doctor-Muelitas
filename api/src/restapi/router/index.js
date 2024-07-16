import express from "express";
import { getDataWhithRange } from "../../middleware/report/getDataWhithRange.js";
import { refreshTokens } from "../../middleware/aws/cognito.js";

const app = express();

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.send("Hola mundo!")
})

app.get('/create/report', getDataWhithRange)

app.post('/refresh-token', async (req, res) => {
  const { refreshToken, sub } = req.body;
  try {
    const { idToken } = await refreshTokens({ refreshToken, sub });
    res.json({ idToken });
  } catch (error) {
    res.status(401).json({ error: 'No se puede actualizar el token' });
  }
});

export default app;