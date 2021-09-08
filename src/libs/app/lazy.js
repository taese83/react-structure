export const lazy = (lazyFunc) => {
  if (!lazyFunc || typeof lazyFunc !== 'function') {
    throw new Error('invalid parameter!');
  }

  lazyFunc.lazy = true;
  return lazyFunc;
};
