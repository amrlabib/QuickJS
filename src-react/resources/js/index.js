import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
import UsersList from './containers/UsersList';
import UserDetail from './containers/UserDetail';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


class App extends Component {
    constructor(props) {
        super(props);
    } 
    render() {
        return ( 
            <Provider store={createStoreWithMiddleware(reducers)}>
                <div className="temp-class">
                    <UsersList /> 
                    <UserDetail /> 
                </div>
            </Provider>
        );
    }
}

ReactDOM.render( < App / > , document.querySelector(".react-container"));


