import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';


import UsersList from './containers/UsersList';
import UserDetail from './containers/UserDetail';


//All commented code, used to do some of the currentl functionalities but without redux, by only using component state and props
//import Fetch from 'node-fetch';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


class App extends Component {
    constructor(props) {
        super(props);


        /*this.state = {
            users: [{ _id: "1234", username: "amro" }, { _id: "4321", username: "mohammed" }]
        };*/
        //this.getAllUsers();
    } 

    /*getAllUsers() {
        var self = this;
        fetch("http://localhost:5000/api/users/").
        then(function(response) {
                return response.json();
            })
            .then(function(resultJson) {
                self.setState({ users: resultJson });
            })
            .catch(function(err) {
                console.log(err);
            });
    }*/

    render() {
        return ( 
            <Provider store={createStoreWithMiddleware(reducers)}>
                <div className="temp-class">
                    <UsersList /*users={this.state.users}*/ /> 
                    <UserDetail /> 
                </div>
            </Provider>
        );
    }
}

ReactDOM.render( < App / > , document.querySelector(".react-container"));


