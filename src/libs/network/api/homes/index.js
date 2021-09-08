import { ApiServer } from 'libs/network/server'; // 필요한 서버를 import 한다.

const apis = {
  /** api 메소드 추가 */
  getHome: (homeId) => {
    return ApiServer.get(`/service/homes/${homeId}`);
  },
};

export default apis;
