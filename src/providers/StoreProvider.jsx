import React from 'react';
import propTypes from 'prop-types';
import { Provider } from 'react-redux';
import store from 'stores';

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: propTypes.node,
};

export default StoreProvider;
