import React from 'react';
import propTypes from 'prop-types';
import ReduxProvider from './StoreProvider';
import InitProvider from './InitProvider';

const Provider = ({ children }) => {
  return (
    <ReduxProvider>
      <InitProvider>{children}</InitProvider>
    </ReduxProvider>
  );
};

Provider.propTypes = {
  children: propTypes.node,
};

export default Provider;
