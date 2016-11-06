import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UsersList from './components/UsersList';
import Fetch from 'node-fetch';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [{ _id: "1234", username: "amro" }, { _id: "4321", username: "mohammed" }]
        };

        this.getAllUsers();
    }

    getAllUsers() {
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
    }

    render() {
        return ( < div className = "temp-class" >
            < UsersList users = { this.state.users }
            /> </div >
        );
    }
}

ReactDOM.render( < App / > , document.querySelector(".react-container"));


//
