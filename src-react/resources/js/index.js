import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UsersList from './components/UsersList';

class App extends Component {
    render() {
        return ( 
        	<div className = "temp-class">
            	<UsersList />
            </div>
        );
    }
}

ReactDOM.render( < App / > , document.querySelector(".react-container"));
