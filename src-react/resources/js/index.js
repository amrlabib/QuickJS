import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
import {Router , browserHistory} from  'react-router';
import routes from  './routes';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


class App extends Component {
    constructor(props) {
        super(props);
    } 
    render() {
        return (
            <Provider store={createStoreWithMiddleware(reducers)}>
                <Router history={browserHistory} routes={routes} />
            </Provider>
        );
    }
}

ReactDOM.render( <App /> , document.querySelector(".react-container"));


