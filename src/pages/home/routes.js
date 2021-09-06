const routes = [
  {
    path: '/',
    params: '',
    component: () => import('./screens/Home'),
    stores: [
      {
        name: 'home',
        slice: () => import('./stores/slice'),
        saga: () => import('./stores/saga'),
      },
    ],
  },
  {
    path: 'detail',
    params: '/:id',
    component: () => import('./screens/Detail'),
  },
];
export default routes;
