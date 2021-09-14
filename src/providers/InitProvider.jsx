import React, { useLayoutEffect } from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { idle, init } from 'stores/init/slice';

const InitContext = React.createContext({
  initialized: false,
});

const Provider = ({ children }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(init());
    return () => dispatch(idle());
  }, [dispatch]);

  return <InitContext.Provider value="">{children}</InitContext.Provider>;
};

Provider.propTypes = {
  children: propTypes.node,
};

export { InitContext };
export default Provider;
