//pages 폴더를 root 폴더로 routes.js를 찾는다.
//roote 폴더 변경 가능
const req = require.context('pages', true, /routes.js/);
export default req.keys().reduce((acc, key) => {
  return [...acc, ...req(key).default];
}, []);
