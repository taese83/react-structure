import React from 'react';
import { Router as BrowserRouter } from 'react-router';
import { generateRoutes } from './router';
import Renderer from './Renderer';
import history from 'libs/history/history';
import routes from './conf/routes';

const Router = () => (
  <BrowserRouter history={history}>
    <Renderer routes={generateRoutes(routes)} />
  </BrowserRouter>
);

export default Router;
