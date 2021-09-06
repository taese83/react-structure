import React from 'react';
import propTypes from 'prop-types';

import useInit from 'libs/init/useInit';

const InitContext = React.createContext({
  initialized: false,
});

const Provider = ({ children }) => {
  const { initialized } = useInit();

  return (
    <InitContext.Provider value={{ initialized }}>
      {children}
    </InitContext.Provider>
  );
};

Provider.propTypes = {
  children: propTypes.node,
};

export { InitContext };
export default Provider;
