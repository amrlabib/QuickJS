import React , { Component } from 'react';

export default class Login extends Component
{
	constructor(props)
	{
		super(props);
		this.state= { username: ""  ,  password : ""};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	handleUsernameChange(event)
	{
		this.setState({
			username : event.target.value
		})
	}

	handlePasswordChange(event)
	{
		this.setState({
			password : event.target.value
		})
	}

	render()
	{
		return (
			<section>
				<form>
					<h3>Login</h3>
					<div className="form-group">
						<label>Username:</label>
						<input type="text" name="username" value={this.state.username}  className="form-control" onChange={this.handleUsernameChange} />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" name="password" value={this.state.password} className="form-control" onChange={this.handlePasswordChange} />
					</div>
					<button type="submit" className="btn btn-primary" >Submit</button>
				</form>
			</section>
			)
	}
}