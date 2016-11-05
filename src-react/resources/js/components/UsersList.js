import React, { Component } from 'react';
import UserListItem from "./UserListItem";

class UsersList extends React.Component
{
	render()
	{
		return (
			<section className="home">
			    <h1>Users list</h1>
			    <ul className="list-group">
			        <UserListItem />
			    </ul>
			</section>
		);
	}
}

export default UsersList;