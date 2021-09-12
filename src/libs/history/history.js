import { extractPath, matchRoute } from 'routers';
import { createBrowserHistory } from 'history';
import { stack, stackSelector, fromSelector } from 'stores/history/slice';
import store from 'stores';
import { useSelector } from 'react-redux';

const history = createBrowserHistory();
export const STACK_NAME = 'history.stack';

const historyEvent = (location, action) => {
  try {
    const route = matchRoute(location.pathname);
    if (!route) return;

    const historyStack = store.getState().history.stack;
    const fromPath = historyStack[historyStack.length - 1];
    let newStack = [...historyStack];

    switch (action) {
      case 'PUSH':
        newStack = [...newStack, route.key];
        store.dispatch(stack({ stack: newStack, from: fromPath }));
        break;
      case 'REPLACE':
        newStack[newStack.length - 1] = route.key;
        store.dispatch(stack({ stack: newStack }));
        break;
      case 'POP':
        if (!route.key) {
          newStack.pop();
        } else {
          const index = newStack.lastIndexOf(route.key);
          if (index < 0) {
            newStack.pop();
          } else {
            newStack = newStack.slice(0, index + 1);
          }
        }
        store.dispatch(stack({ stack: newStack, from: fromPath }));
        break;
      default:
        break;
    }
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

const useStack = () => {
  const stack = useSelector(stackSelector);
  return stack;
};

const useFrom = () => {
  const from = useSelector(fromSelector);
  return from;
};

export default history;
export { go, replace, back, useStack, useFrom };
