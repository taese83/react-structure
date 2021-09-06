# 화면 폴더

## 페이지 구현 절차

    - pages 하위폴더에 필요한 페이지 폴더를 생성
    - 필요한 페이지 컴포넌트 폴더 및 파일을 추가하고 구현
    - 상태관리가 필요한경우 stores 폴더 생성
    - store 폴더에 필요한 slice, saga 파일을 생성
    - 이미지가 필요한 경우 images 폴더 생성하고 이미지 추가
    - 생성된 페이지 폴더에 routes.js 파일 생성

## routes.js 구현 방법

```
const routes = [
  {
    path: 'login', //route path 지정 (필수)
    params: '/:id/:name/:age', //path 뒤에 붙는 path paramater 설정
    component: () => import('./Login'), //dynamic import 형식으로 화면에 표시될 컴포넌트 파일 설정 (필수)
    stores: [ // 컴포넌트에 바인당 할 store 배열을 설정
      {
        name: 'login', //store name 설정, 각 스토어를 구분하기 위한 값, 화면 전체 고유한 값으로 설정
        slice: () => import('./store/slice'), //dynamic import 형식으로 바인딩할 slice 파일 설정
        saga: () => import('./store/saga'), //dynamic import 형식으로 바인딩할 saga 파일 설정
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
        - routes.js
        - libs/
        - images/
        - stores/
            - loginSlice.js
            - loginSaga.js
```
