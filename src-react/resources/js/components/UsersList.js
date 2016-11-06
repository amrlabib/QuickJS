import React, { Component } from 'react';
import UserListItem from "./UserListItem";

class UsersList extends Component{
	constructor(props)
	{
		super(props);
	}

	render()
	{
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

export default UsersList;