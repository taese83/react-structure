import { extractPath, matchRoute } from 'routers';
import { createBrowserHistory } from 'history';
import { push, replace as repl, pop, save } from 'stores/history/slice';
import store from 'stores';

const history = createBrowserHistory();
export const STACK_NAME = 'history.stack';

const historyEvent = (location, action) => {
  try {
    const route = matchRoute(location.pathname);
    if (!route) return;

    switch (action) {
      case 'PUSH':
        store.dispatch(push(route.key));
        break;
      case 'REPLACE':
        store.dispatch(repl(route.key));
        break;
      case 'POP':
        store.dispatch(pop());
        break;
      default:
        break;
    }
    store.dispatch(save(store.getState()?.history?.stack));
  } catch (e) {
    //do nothing
  }
};
history.listen(historyEvent);

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
  if (typeof step === 'string') {
    // back('/') 과 같이 특정 history stack 지점으로 back시킬 수 있는 기능
    const stack = store?.getState()?.history?.stack || [];
    const index = stack.lastIndexOf(step);
    step = index >= 0 ? -(stack.length - (index + 1)) : index;
  }
  typeof step === 'number' ? history.go(step) : history.goBack();
};

export default history;
export { go, replace, back };
