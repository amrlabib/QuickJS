import React, { Component } from 'react';
import UserListItem from "./UserListItem";

class UsersList extends React.Component
{


	render()
	{
		return (
			<div>
				<h1>Users list</h1>
			   	<ul className="list-group"></ul>
		   	</div>
		);
	}
}

export default UsersList;