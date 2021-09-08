const setIntercepter = (axios) => {
  axios.interceptors.response.use(
    function (res) {
      // 수신 완료 후 처리 로직
      return res;
    },
    function (error) {
      // 수신 에러 후 처리 로직
      return error;
    },
  );
};

export default setIntercepter;
