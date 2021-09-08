import proxyList from './proxy-list.json';

const setProxy = (axiosInstance) => {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_IS_DEV === 'true'
  ) {
    axiosInstance.interceptors.request.use(function (config) {
      //요청전에 proxy 설정해서 cors 에러를 우회한다.
      proxyList.forEach(({ proxy, origin }) => {
        if (!proxy || !origin) return;
        if (config.url.indexOf(origin) > -1) {
          config.url = config.url.replace(origin, proxy);
        }
      });
      return config;
    });
  }
};

export default setProxy;
