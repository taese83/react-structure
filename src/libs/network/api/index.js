const req = require.context('.', true, /\.\/[^/]+\/index.js$/);

export default req.keys().reduce((acc, key) => {
  const group = key.replace(/^.+\/([^/]+)\/index.js/, '$1');
  const apis = req(key)?.default;
  if (group && apis) {
    return (acc[group] = apis);
  }
  return acc;
}, {});
