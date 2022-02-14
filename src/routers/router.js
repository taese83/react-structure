import { matchPath } from 'react-router';
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
      route.path.length === 1
        ? route.path
        : route.path?.charAt(route.path.length - 1) === '/'
        ? route.path.slice(0, -1)
        : route.path;
    const pks = route.params ? route.params.split('/:').slice(1) : [];
    const paramKeys = pks.map((param) => {
      const key = param.replace('?', '');
      const optional = /.+\?$/.test(param);
      return {
        key,
        optional,
      };
    });

    const component = loadable(() => {
      const stores = route.stores || [];

      stores.forEach(async ({ name, slice, saga, persist }) => {
        if (slice) {
          let reducer = slice.reducer;
          if (slice.lazy) {
            const asyncSlice = await slice();
            reducer = asyncSlice?.default?.reducer;
          }
          reducer && store.injectReducer(name, reducer, persist);
        }

        if (saga) {
          if (saga.lazy) {
            const asyncSaga = await saga();
            const defaultSaga = asyncSaga?.default;
            defaultSaga && store.injectSaga(name, defaultSaga);
          } else {
            store.injectSaga(name, saga);
          }
        }
      });

      // stores가 없을경우 기존 리듀서 유지를 위해 injectReducer 호출
      if (stores.length === 0) {
        store.injectReducer(key);
      }

      if (route.component?.lazy) {
        return route.component();
      } else {
        return Promise.resolve(route.component);
      }
    });

    return {
      key,
      paramKeys,
      exact: true,
      path: `/${key}${route.params || ''}`,
      component,
    };
  });

  $routes = [...genRoutes];
  return genRoutes;
};

const renderRoutes = (routes) => {
  return render(routes);
};

const findRoute = (name, params = {}) => {
  const keys = Object.keys(params);
  return $routes.find((route) => {
    if (route.key !== name) {
      return false;
    }

    for (let key of keys) {
      if (!route.paramKeys.find((k) => k.key === key)) {
        return false;
      }
    }

    return true;
  });
};

const extractPath = (path, params) => {
  let route = findRoute(path, params);
  if (!route) return;

  let getParams = {};
  route.paramKeys.forEach(({ key, optional }) => {
    getParams[key] = params[key] || (optional ? EMPTY_PARAM : null);
  });

  try {
    return generatePath(route.path, getParams);
  } catch (e) {
    return null;
  }
};

export const matchRoute = (pathname) => {
  let findPath = null;

  for (const route of $routes) {
    const mPath = matchPath(pathname, {
      path: route.path,
      exact: true,
    });

    if (mPath) {
      findPath = route;
      break;
    }
  }
  return findPath;
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
