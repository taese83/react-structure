import React from 'react';
import Provider from 'providers/Provider';
import PageRouter from 'routers/PageRouter';

function App() {
  return (
    <Provider>
      <PageRouter />
    </Provider>
  );
}

export default App;
