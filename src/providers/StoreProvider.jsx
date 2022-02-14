import React from 'react';
import propTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'stores';

const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};

StoreProvider.propTypes = {
  children: propTypes.node,
};

export default StoreProvider;
