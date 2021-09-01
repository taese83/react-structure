import React from "react";
import store from "store";

const withStore = (key, reducer, saga) => (WrappedComponent) => {
  const Extended = (props) => {
    store.injectReducer(key, reducer);
    store.injectSaga(key, saga);
    return <WrappedComponent {...props} />;
  };
  return Extended;
};

export { withStore };
