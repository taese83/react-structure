const routes = [
  {
    path: 'setting',
    params: '',
    component: () => import('./screens/Setting'),
    stores: [
      {
        name: 'setting',
        slice: () => import('./stores/slice'),
        saga: () => import('./stores/saga'),
      },
    ],
  },
];
export default routes;
