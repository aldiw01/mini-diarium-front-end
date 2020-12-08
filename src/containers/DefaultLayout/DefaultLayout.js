import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import AuthService from '../../server/AuthService';
import axios from 'axios';

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const defaultProps = {
  ACCESS_ROLES_PAGE: [
    "1", "2A1", "2A2", "2B", "2C"
  ]
};

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    if (!this.Auth.loggedIn()) {
      window.location = '/login';
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.Auth.getToken();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    // INSERT HISTORY INTO DATABASE
    var request = {
      reference_id: this.Auth.getProfile().id,
      user_id: this.Auth.getProfile().id,
      step_id: "LOG2",
      message: this.Auth.getProfile().id
    }
    axios.post(process.env.REACT_APP_API_PATH + '/history', request)
      .catch(error => {
        alert(error);
        console.log(error);
      });
    ////////////////////////////////////////////////////////////////
    this.Auth.logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter className="bg-dark">
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

DefaultLayout.defaultProps = defaultProps;

export default DefaultLayout;
