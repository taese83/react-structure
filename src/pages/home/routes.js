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
      },
    ],
  },
  {
    path: 'detail',
    params: '/:id',
    component: Detail,
  },
];
export default routes;
