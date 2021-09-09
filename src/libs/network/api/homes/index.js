import { ApiServer } from 'libs/network/server'; // 필요한 서버를 import 한다.

/** api 메소드 추가 */
export default {
  getHome: (homeId) => {
    return ApiServer.get(`/service/homes/${homeId}`);
  },
};
