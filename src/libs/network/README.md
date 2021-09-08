# Network 라이브러리

## 사용방법

```
import {Api} from 'libs/network';

//api 요청
const response = await Api.homes.getHome(1);

```

## API 적용 방법

api 폴더에 group 폴더를 생성하고 index.js를 추가한다.
index.js에 하기 형식으로 api를 추가한다.

    -api
      -homes
        -index.js

```
import { ApiServer } from 'libs/network/server';
//server 폴더에 생성한 서버 모듈을 import한다.

const apis = {
  /** api 메소드 추가 */
  getHome: (homeId) => {
    return ApiServer.get(`/service/homes/${homeId}`); //서버 메서드 호출
  },
});

export default apis;
```

외와 같이 생성하면 api.homes.getHome() 메소드 호출 가능하게 됩니다.
