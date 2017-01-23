import React , { Component } from 'react';
import { Link } from 'react-router';

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
	        	<span>Password: {this.props.user.password}</span><br/>
	        	<button className='btn btn-danger' onClick={this.props.deleteHandler}>Delete</button>
	        	<Link to={"/users/details/" + this.props.user._id} className='btn btn-primary' >Details</Link>
			</li>
	    );
	}
}