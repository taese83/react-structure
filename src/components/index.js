const req = require.context(
  '.',
  true,
  /\.\/[^/]+\/((?!(index|stories)).)*\.js$/,
);
//index.js 를 제외한 하위 컴포넌트 파일 추출 경로 추출

req.keys().forEach((key) => {
  const componentName = key.replace(/^.+\/([^/]+)\.js/, '$1');
  module.exports[componentName] = req(key).default;
});
