import React from 'react';

const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Dashboard = React.lazy(() => import('./views/Admin/Dashboard'));
// Activities
const Activities = React.lazy(() => import('./views/Admin/Activities'));

const Profile = React.lazy(() => import('./views/Profile/Profile'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));

const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/activities', exact: true, name: 'Activities', component: Activities },

  { path: '/profile', name: 'Profile', component: Profile },
  // { path: '/register', name: 'Register', component: Register },
  { path: '/:id', name: 'Page 404', component: Page404 }
];

export default routes;
