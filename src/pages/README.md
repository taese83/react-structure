# 화면 폴더

## 페이지 구현 절차

    - pages 하위폴더에 필요한 페이지 폴더를 생성
    - 필요한 페이지 컴포넌트 폴더 및 파일을 추가하고 구현
    - 상태관리가 필요한경우 stores 폴더 생성
    - stores 폴더에 필요한 slice, saga 파일을 생성
    - 이미지가 필요한 경우 images 폴더 생성하고 이미지 추가
    - 생성된 페이지 폴더에 routes.js 파일 생성

## routes.js 구현 방법

```
import { lazy } from 'routers';

const routes = [
  {
    path: 'login', //route path 지정 (필수)
    params: '/:id/:name/:age', //path 뒤에 붙는 path paramater 설정
    component: lazy(() => import('./Login')), // lazy 적용
    stores: [ // 컴포넌트에 바인당 할 store 배열을 설정
      {
        name: 'login', //store name 설정, 각 스토어를 구분하기 위한 값, 화면 전체 고유한 값으로 설정
        slice: lazy(() => import('./store/slice')),  // lazy 적용
        saga: lazy(() => import('./store/saga')),  // lazy 적용
      },
    ],
  },
];

export default routes;
```

## 페이지 폴더 구성 예시

```
- pages/
    - login/
        - screens/
            - Login.jsx
            - FindId.jsx
            - FindPassWord.jsx
        - libs/
        - images/
        - hooks/
        - stores/
            - loginSlice.js
            - loginSaga.js
        - routes.js
```
