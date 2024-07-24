import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { Toaster } from 'react-hot-toast';
import { router } from './router/index.jsx';
import './css/index.css'
import ToastComponent from './components/ToastComponent.jsx';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';

const client = new ApolloClient({
  uri: 'https://j39b0mfj-4004.use.devtunnels.ms/gql',
  // uri: 'http://127.0.0.1:4004/gql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={false}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
        <ToastComponent />
      </ApolloProvider>
    </PersistGate>
  </Provider>
  ,
)
