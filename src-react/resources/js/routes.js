import React from 'react';
import { Route , IndexRoute} from 'react-router';
import App from './components/app';
import UsersListIndex from './containers/UsersList';
import UsersDetailIndex from './containers/UserDetail';
import LoginIndex from './containers/Login';
import SignupIndex from './components/Signup';



export default (
  <Route  path="/" component={App} >
  	<IndexRoute component={UsersListIndex} />
  	<Route path="login" component={LoginIndex} />
  	<Route path="signup" component={SignupIndex} />
  	<Route path="/users/details/:id" component={UsersDetailIndex} />
  </Route>
);