import React from 'react';

const Dashboard = React.lazy(() => import('./views/Admin/Dashboard'));
// Activities
const Activities = React.lazy(() => import('./views/Admin/Activities'));

const Profile = React.lazy(() => import('./views/Profile/Profile'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/activities', exact: true, name: 'Activities', component: Activities },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/:id', name: 'Page 404', component: Page404 }
];

export default routes;
