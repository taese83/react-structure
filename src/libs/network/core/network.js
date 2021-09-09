import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import env from '../env';
import setProxy from '../proxy';
import setIntercepter from '../intercepter';
import { normalize, error } from '../response/response';

class Network {
  constructor() {
    this.axiosInstance = axios.create({
      adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
        enabledByDefault: env.USE_CACHE, // no cache
      }),
    });

    setProxy(this.axiosInstance);
    setIntercepter(this.axiosInstance);
  }

  get(...params) {
    return this.axiosInstance.get(...params);
  }

  request(url, method = 'GET', headers, params, data, configs = {}) {
    const req = new Promise((resolve, reject) => {
      const {
        transformRequest = undefined,
        useCache = false, //서버요청은 기본적으로 no cache, true일경우 cache 데이터 사용함
        timeout = env.NETWORK_TIMEOUT,
      } = configs;

      this.axiosInstance({
        url,
        method,
        headers,
        params,
        data,
        transformRequest,
        timeout,
        forceUpdate: !useCache,
        cache: useCache,
        cancelToken: new axios.CancelToken(function executor(cancel) {
          req.cancel = cancel;
        }),
      })
        .then((response) => {
          resolve(normalize(response.data));
        })
        .catch((e) => {
          error(e, resolve, reject);
        });
    });

    return req;
  }
}

export default new Network();
