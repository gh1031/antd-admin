import React from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory'
import BasicLayout from './layout/BasicLayout';
import asyncComponent from './components/AsyncComponent';
import SignInComponent from './components/SignInComponent';
import RegisterComponent from './components/RegisterComponent';
import store from './storeConfig';

const history = createBrowserHistory()
const routes = [
  {
    path: '/dashboard',
    component: asyncComponent(() => import('./views/Dashboard/Dashboard')),
  }, {
    path: '/user',
    component: asyncComponent(() => import('./views/User/User')),
  }, {
    path: '/post',
    component: asyncComponent(() => import('./views/Post/Post')),
  }, {
    path: '/charts/eCharts',
    component: asyncComponent(() => import('./views/Charts/Echarts')),
  }, {
    path: '/charts/highCharts',
    component: asyncComponent(() => import('./views/Charts/HighCharts')),
  }, {
    path: '/charts/ReCharts',
    component: asyncComponent(() => import('./views/Charts/ReCharts')),
  }
]
const RouteConfig = (
  <Provider store={store}>
    <LocaleProvider locale={zh_CN}>
      <Router>
          <Switch>
            <Route path="/" exact render={() => (<Redirect to="/dashboard" />)} />
            <Route path="/login" component={SignInComponent} />
            <Route path="/register" component={RegisterComponent} />
            <BasicLayout history={history}>
            {
              routes.map((item) => (
                  <Route
                    key={item.path} 
                    path={item.path} 
                    component={item.component} 
                  />
              ))
            }
            </BasicLayout>
          </Switch>
      </Router>
    </LocaleProvider>
  </Provider>
)

export default RouteConfig;
