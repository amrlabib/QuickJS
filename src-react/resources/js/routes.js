import React from 'react';
import { Route , IndexRoute} from 'react-router';
import App from './components/app';
import UsersListIndex from './containers/UsersList';
import UsersDetailIndex from './containers/UserDetail';

export default (
  <Route  path="/" component={App} >
  	<IndexRoute component={UsersListIndex} />
  	<Route path="users" component={UsersDetailIndex} />
  </Route>
);