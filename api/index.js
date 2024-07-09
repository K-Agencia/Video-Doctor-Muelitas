import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import typeDefinitions from './src/graphql/typeDefinitions.js';
import resolvers from './src/graphql/resolvers.js';
import { dbConnect } from './src/config/config_db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers: resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/',
  cors(),
  express.json({ limit: '50mb' }),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

try {
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  await dbConnect();
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
} catch (error) {
  console.log(error);
}