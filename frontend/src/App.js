import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import CreateGlobalStyle from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <Routes />
      <CreateGlobalStyle />
    </BrowserRouter>
  );
}

export default App;
