import React , { Component } from 'react';

const UserListItem = ({user}) => {

    return (
        <li className="list-group-item">
        	<span>Username: {user.username}</span><br/>
        	<span>Username: {user.passowrd}</span>

		</li>
    );
}


export default UserListItem;