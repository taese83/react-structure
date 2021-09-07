import store from 'stores';
import loadable from 'loadable-components';
import { renderRoutes as render } from 'react-router-config';
import { generatePath, useParams as useRouterParams } from 'react-router-dom';

const EMPTY_PARAM = ' ';

let $routes = [];
const generateRoutes = (routes) => {
  if (!routes) return;

  const genRoutes = routes.map((route) => {
    const key =
      route.path?.charAt(route.path.length - 1) === '/'
        ? route.path.slice(0, -1)
        : route.path;
    const paramKeys = route.params
      ? route.params.replace(/\?/g, '').split('/:').slice(1)
      : [];

    const component = loadable(() => {
      const stores = route.stores || [];

      stores.forEach(async ({ name, slice, saga }) => {
        if (slice && slice.lazy && typeof slice === 'function') {
          const asyncSlice = await slice();
          const defaultSlice = asyncSlice?.default;
          defaultSlice && store.injectReducer(name, defaultSlice.reducer);
        }

        if (saga && saga.lazy && typeof saga === 'function') {
          const asyncSaga = await saga();
          const defaultSaga = asyncSaga?.default;
          defaultSaga && store.injectSaga(name, defaultSaga);
        }
      });

      return route.component.lazy && route.component();
    });

    return {
      key,
      paramKeys,
      exact: true,
      path: `/${key}${route.params || ''}`,
      component,
    };
  });

  $routes = [...$routes, ...genRoutes];
  return genRoutes;
};

const renderRoutes = (routes) => {
  return render(routes);
};

const findRoute = (name) => {
  return $routes.find((route) => route.key === name);
};

const extractPath = (path, params) => {
  let route = findRoute(path);
  if (!route) return;

  let getParams = {};
  route.paramKeys.forEach((key) => {
    getParams[key] = params[key] || EMPTY_PARAM;
  });

  return generatePath(route.path, getParams);
};

const useParams = () => {
  const params = useRouterParams();
  for (const key in params) {
    if (params[key] === EMPTY_PARAM) {
      delete params[key];
    }
  }
  return params;
};

export { generateRoutes, renderRoutes, extractPath, useParams };
