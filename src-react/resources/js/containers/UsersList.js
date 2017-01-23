//Containers are components that has access to redux state, that actually need to know about the application state
//(Smart component) as mentioned in redux documentation.
import React, { Component } from 'react';
import UserListItem from "../components/UserListItem";
//React redux is the connection between React and Redux libraries
import { connect } from 'react-redux';
import { deleteUser } from '../actions/deleteUserAction';
import { fetchUsers } from '../actions/fetchUsersAction';
import { bindActionCreators } from 'redux';


class UsersList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //this function is accessible from props because its an action that was bound to this component by mapDispatchToProps and connect
        //from both react-redux and redux modules
        this.props.fetchUsers();
    }

    deleteUserHandler(user) {
        //another action from redux
        this.props.deleteUser(user).then(function(result) {
            
        }.bind(this));
    }

    render() {
        var userItems = <div> ..... < /div>;
        if (this.props.users != null) {
            const { users } = this.props;
            userItems = users.map((user) => {
                return ( <UserListItem key = { user._id }
                    user = { user }
                    deleteHandler = {
                        () => { this.deleteUserHandler.bind(this)(user._id); } }
                    />
                );
            });
        }
        return ( <section className = "home" >
            < h1 > Users list < /h1>< ul className = "list-group" > { userItems } < /ul> < /section>
        );
    }
}

//This function is the connection between the react component and redux, this is done by react-redux
function mapStateToProps(state) {
    //whatever is retured here will be added in the component(container) props
    return {
        users:  state.users.list
        //user : state.user
    }
}

//Any thing returned from this function will end as a props in the container 
function mapDispatchToProps(dispatch) {
    //Whenever selectBook is called the result should be passed to all reducers
    return bindActionCreators({  fetchUsers: fetchUsers, deleteUser: deleteUser }, dispatch);
}

//Connect function from react-redux will take a function and a component and produces a container (which is a component aware of redux state)
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);



//Whenever the application state changes the application will rerender the application state again.
