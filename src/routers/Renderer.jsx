import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from './router';
import { Switch } from 'react-router';

const Renderer = ({ routes }) => {
  return <Switch>{renderRoutes(routes)}</Switch>;
};

Renderer.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Renderer;
