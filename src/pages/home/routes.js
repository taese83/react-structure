import { lazy } from 'libs';

const Home = lazy(() => import('./screens/Home'));
const Detail = lazy(() => import('./screens/Detail'));

const homeSlice = lazy(() => import('./stores/slice'));
const homeSaga = lazy(() => import('./stores/saga'));

const routes = [
  {
    path: '/',
    params: '',
    component: Home,
    stores: [
      {
        name: 'home',
        slice: homeSlice,
        saga: homeSaga,
        persist: true,
        global: true,
      },
    ],
  },
  {
    path: 'detail',
    params: '/:id/:age',
    component: Detail,
  },
  {
    path: 'detail/setting',
    params: '/:age/:name?',
    component: Detail,
  },
];
export default routes;
