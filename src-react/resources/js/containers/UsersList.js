//Containers are components that has access to redux state, that actually need to know about the application state
//(Smart component) as mentioned in redux documentation.

import React ,  {Component} from 'react';
import UserListItem from "../components/UserListItem";
//React redux is the connection between React and Redux libraries
import { connect } from 'react-redux';

class UsersList extends Component
{
	render(){


		const {users} = this.props;
		const userItems = users.map((user) => {
	    return (
	      <UserListItem
	        key={user._id}
	        user={user} />
		   );
		 });

		return (
			<section className="home">
			    <h1>Users list</h1>
			    <ul className="list-group">
			        {userItems}
			    </ul>
			</section>
		);
	}
}

//This function is the connection between the react component and redux, this is done by react-redux
function mapStateToProps(state)
{
	//whatever is retured here will be added in the component(container) props
	return {
		users: state.users
	}
}

//Connect function from react-redux will take a function and a component and produces a container (which is a component aware of redux state)
export default connect(mapStateToProps)(UsersList);



//Whenever the application state changes the application will rerender the application state again.