import { lazy } from 'routers';

const Setting = lazy(() => import('./screens/Setting'));
const slice = lazy(() => import('./stores/slice'));
const saga = lazy(() => import('./stores/saga'));

const routes = [
  {
    path: 'setting',
    params: '',
    component: Setting,
    stores: [
      {
        name: 'setting',
        slice,
        saga,
      },
    ],
  },
];
export default routes;
