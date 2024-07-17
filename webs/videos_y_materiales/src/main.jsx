import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import App from './App.jsx'
import { router } from './router/index.jsx';
import './css/index.css'

const client = new ApolloClient({
  uri: 'http://localhost:4004/gpl',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>,
)
