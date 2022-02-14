const req = require.context('resources/langs', false, /.json/);
export default req.keys().reduce((acc, key) => {
  const { langCode } = req(key);
  if (!langCode) {
    return { ...acc };
  }

  if (Array.isArray(langCode)) {
    return langCode.reduce((pre, code) => {
      return { ...pre, [code]: req(key) };
    }, acc);
  }
  return { ...acc, [langCode]: req(key) };
}, {});
