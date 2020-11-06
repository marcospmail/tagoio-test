import React from 'react';
import { ToastContainer  } from 'react-toastify'

import { TodosProvider } from './hooks/useTodos';

import Routes from './routes';

import GlobalStyle from './styles/global'

function App() {
  return (
    <TodosProvider>
      <Routes />
      <GlobalStyle />
      <ToastContainer autoClose={3000} hideProgressBar={true} />
    </TodosProvider>
  );
}

export default App;
