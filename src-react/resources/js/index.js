import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    render() {
        return ( < div className = "temp-class" >
            Hello World React < /div>
        );
    }
}

ReactDOM.render( <App /> , document.querySelector(".react-container"));
