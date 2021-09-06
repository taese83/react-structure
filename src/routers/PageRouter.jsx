import React from 'react';
import { Router as BrowserRouter } from 'react-router';
import { generateRoutes } from './router';
import Renderer from './Renderer';
import history from 'libs/history/history';

let routes = [];
const req = require.context('pages', true, /routes.js/);
req.keys().forEach((key) => {
  routes = [...routes, ...req(key).default];
});

const Router = () => (
  <BrowserRouter history={history}>
    <Renderer routes={generateRoutes(routes)} />
  </BrowserRouter>
);

export default Router;
