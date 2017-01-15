import React , { Component } from 'react';

export default class UserListItem extends Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
	    return (
	        <li className="list-group-item" onClick={this.props.onClick}>
	        	<span>Username: {this.props.user.username}</span><br/>
	        	<span>Username: {this.props.user.passowrd}</span>
			</li>
	    );
	}
}