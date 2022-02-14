import { lazy } from 'libs';
import { globalReducer } from 'stores';

const Home = lazy(() => import('./screens/Home'));
const Detail = lazy(() => import('./screens/Detail'));

const homeSlice = lazy(() => import('./stores/slice'));
const homeSaga = lazy(() => import('./stores/saga'));

globalReducer(homeSlice);

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
