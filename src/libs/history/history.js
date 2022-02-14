import { extractPath } from 'routers';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const EMPTY_PARAM = ' ';

const go = (path, params = {}, options = {}) => {
  if (typeof path !== 'string') return;

  const { action = 'push', state = {} } = options;
  const pathname = extractPath(path, params);
  if (!pathname) return;

  history[action]({ pathname, state });
};

const replace = (path, params, options = {}) => {
  go(path, params, { ...options, action: 'replace' });
};

const back = (step = -1) => {
  typeof step === 'number' ? history.go(step) : history.goBack();
};

export default history;
export { go, replace, back };

function reloadUrl({ pathname, state = {} }) {
  history.replace({
    pathname: pathname
      .split('/')
      .map((path) => (!path ? EMPTY_PARAM : path))
      .join('/')
      .trim(),
    state,
  });
}
reloadUrl(history.location);
