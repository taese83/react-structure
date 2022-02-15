import { matchPath } from 'react-router';
import store from 'stores';
import loadable from 'loadable-components';
import { renderRoutes as render } from 'react-router-config';
import { generatePath, useParams as useRouterParams } from 'react-router-dom';

const EMPTY_PARAM = ' ';

let $routes = [];

const isLocal = ({ global }) => !global;
const isGlobal = ({ global }) => global;

const injectStores = ({ name, slice, saga, persist }) => {
  store.injectSlice(name, slice, persist);
  store.injectSaga(name, saga);
};

const removeLastPathSeparator = (path) => {
  if (path.length === 1) return path;
  if (path.charAt(path.length - 1) === '/') {
    return path.substring(0, path.length - 1);
  }
  return path;
};

const generateRoutes = (routes) => {
  if (!routes) return;

  const genRoutes = routes.map((route) => {
    const key = removeLastPathSeparator(route.path);
    const pks = route.params ? route.params.split('/:').slice(1) : [];
    const paramKeys = pks.map((param) => {
      const key = param.replace('?', '');
      const optional = /.+\?$/.test(param);
      return {
        key,
        optional,
      };
    });

    const stores = route.stores || [];
    stores.filter(isGlobal).forEach(injectStores);

    const component = loadable(() => {
      stores.filter(isLocal).forEach(injectStores);

      return route.component?.lazy
        ? route.component()
        : Promise.resolve(route.component);
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
  return Object.keys(params)
    .filter((key) => params[key] !== EMPTY_PARAM)
    .reduce((pre, key) => ({ ...pre, [key]: params[key] }), {});
};

export { generateRoutes, renderRoutes, extractPath, useParams };
