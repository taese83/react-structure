import env from '../../env';
import network from 'libs/network/network';

/**
 * 서버가 여러개일 경우 형식을 복사해서 서버를 늘려가갈수 있음
 */
const ApiServer = () => {
  const url = (path) => {
    /**
     * url 정보 추가
     */
    return `${env.URLS.API.OP}${path}`;
  };

  const header = () => {
    return {
      'Content-type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
      /**
       * header 정보 추가
       */
    };
  };

  const request = (path, method, queryParams, bodyData, configs) =>
    network.request(
      url(path),
      method,
      header(),
      queryParams,
      bodyData,
      configs,
    );

  return {
    get url() {
      return url();
    },

    get header() {
      return header();
    },

    get(path, queryParams, bodyData, configs) {
      return request(path, 'GET', queryParams, bodyData, configs);
    },

    post(path, queryParams, bodyData, configs) {
      return request(path, 'POST', queryParams, bodyData, configs);
    },

    put(path, queryParams, bodyData, configs) {
      return request(path, 'PUT', queryParams, bodyData, configs);
    },

    delete(path, queryParams, bodyData, configs) {
      return request(path, 'DELETE', queryParams, bodyData, configs);
    },
  };
};

export default ApiServer();
