import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { Toaster } from 'react-hot-toast';
import { router } from './router/index.jsx';
import './css/index.css'
import ToastComponent from './components/ToastComponent.jsx';

const client = new ApolloClient({
  uri: 'http://localhost:4004/gpl',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
    {/* <Toaster /> */}
    <ToastComponent />
  </ApolloProvider>,
)
